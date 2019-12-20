import { combineLatest, EMPTY, merge, Observable, of, pipe } from 'rxjs';
import { combineAll, map, mergeMap, share, tap } from 'rxjs/operators';

import { ICacheKeyProvider } from './cache-key-provider';

export interface IMinMax<T> {
  min: T;
  max: T;
}

/**
 * This class expresses data cache
 */
export abstract class DataCache<TKey, TValue, TData = TValue> {
  private cache: Map<string, TValue> = new Map<string, TValue>();

  private preparation: Observable<void>;
  private isPreparing = false;

  public constructor(private readonly keyProvider: ICacheKeyProvider<TKey>) {}

  public get(key: TKey): Observable<TValue> {
    if (this.isPreparing) {
      return this.preparation.pipe(mergeMap(() => this.getFromCache(key)));
    }

    return this.getFromCache(key);
  }

  public getRange(keyFrom: TKey, keyTo: TKey): Observable<TValue[]> {
    const keys = this.toArray(keyFrom, keyTo);

    if (this.isPreparing) {
      return this.preparation.pipe(
        mergeMap(
          (): Array<Observable<TValue>> => {
            return keys.map(key => this.getFromCache(key));
          },
        ),
        combineAll(),
      );
    }

    return of(...keys.map(key => this.getFromCache(key))).pipe(combineAll());
  }

  public set(key: TKey, value: TValue): void {
    this.cache.set(this.getKeyString(key), value);
  }

  public delete(key: TKey): boolean {
    return this.cache.delete(this.getKeyString(key));
  }

  public clear(): void {
    this.cache = new Map<string, TValue>();
  }

  public has(key: TKey): boolean {
    return this.cache.has(this.getKeyString(key));
  }

  public prepare(keyFrom: TKey, keyTo: TKey): void {
    const keys = this.toArray(keyFrom, keyTo);
    const groups: TKey[][] = [];
    let currentGroup: TKey[] = [];

    for (const key of keys) {
      if (this.has(key)) {
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
          currentGroup = [];
        }
      } else {
        currentGroup.push(key);
      }
    }

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    if (groups.length > 0) {
      this.isPreparing = true;
      this.preparation = merge(...groups.map(group => this.getDataArray(group))).pipe(share());
      this.preparation.subscribe(() => {
        this.preparation = EMPTY;
        this.isPreparing = false;
      });
    }
  }

  protected getFromCache(key: TKey): Observable<TValue> {
    if (this.has(key)) {
      const value = this.cache.get(this.getKeyString(key));
      if (value === undefined) {
        throw Error('Shit just hit the fan');
      }

      return of(this.getResult(value));
    }

    const result = this.getData(key).pipe(
      map(data => this.getResult(data)),
      tap(value => {
        this.set(key, value);
      }),
    );

    return result;
  }

  protected getResult(value: TData | TValue): TValue {
    return (value as unknown) as TValue;
  }
  protected abstract toArray(keyFrom: TKey, keyTo: TKey): TKey[];
  protected abstract getData(key: TKey): Observable<TData>;
  protected abstract getDataArray(keys: TKey[]): Observable<void>;

  private getKeyString(key: TKey): string {
    return this.keyProvider.getKey(key);
  }
}
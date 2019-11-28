import { Observable, of, EMPTY, zip, pipe } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

/**
 * This class expresses data cache
 */
export abstract class DataCache<TKey, TValue, TData = TValue> {
    private cache: Map<TKey, TValue> = new Map<TKey, TValue>();

    public get(key: TKey): Observable<TValue> {
        if (this.has(key)) {
            const value = this.cache.get(key);
            if (value === undefined) {
                throw Error('Shit just hit the fan');
            }

            return this.getResult(value);
        }

        const result = this.getData(key).pipe(mergeMap(data => this.getResult(data)));
        result.subscribe((value: TValue) => {
            this.set(key, value);
        });

        return result;
    }

    public set(key: TKey, value: TValue): void {
        this.cache.set(key, value);
    }

    public delete(key: TKey): boolean {
        return this.cache.delete(key);
    }

    public clear(): void {
        this.cache = new Map<TKey, TValue>();
    }

    public has(key: TKey): boolean {
        return this.cache.has(key);
    }

    public prepare(keyFrom: TKey, keyTo: TKey): Observable<boolean> {
        const keys = this.toArray(keyFrom, keyTo);
        const groups: TKey[][] = [];
        let currentGroup: TKey[] = [];

        for (const key of keys) {
            if (this.has(key) && currentGroup.length > 0) {
                groups.push(currentGroup);
                currentGroup = [];
            } else {
                currentGroup.push(key);
            }
        }

        if (currentGroup.length > 0) {
            groups.push(currentGroup);
        }

        return zip(groups.map(group => this.getDataArray(group))).pipe(map(() => true));
    }

    protected getResult(value: TData | TValue): Observable<TValue> {
        return of(value as unknown as TValue);
    }
    protected abstract toArray(keyFrom: TKey, keyTo: TKey): TKey[];
    protected abstract getData(key: TKey): Observable<TData>;
    protected abstract getDataArray(keys: TKey[]): Observable<boolean>;
}

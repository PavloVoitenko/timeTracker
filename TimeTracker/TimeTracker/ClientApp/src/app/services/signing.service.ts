import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Token } from '../models/token';
import { User } from '../models/user';
import { StorageItem } from '../shared/util/constants';
import { Navigator } from '../shared/util/routing/navigator';
import { Path } from '../shared/util/routing/path';
import { LandingRoute } from '../shared/util/routing/routing-paths';

import { UserService } from './data/user/user.service';

/**
 * Service that handles signing in/up
 */
@Injectable({
  providedIn: 'root',
})
export class SigningService {

  private readonly signingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isSignedIn());

  public constructor(private readonly service: UserService, private readonly navigator: Navigator) {}

  public signIn(user: User): void {
    this.service.auth(user).subscribe((token: Token) => {
      this.setKey(token);
      this.signingSubject.next(this.isSignedIn());
      this.emitNavigate();
    });
  }

  public signUp(user: User): void {
    this.service.create(user).subscribe((token: Token) => {
      this.setKey(token);
      this.signingSubject.next(this.isSignedIn());
      this.emitNavigate();
    });
  }

  public signOut(): void {
    this.removeKey();
    this.signingSubject.next(this.isSignedIn());
    this.emitNavigate(l => l.Unauthorized);
  }

  public subscribe(action: (next: boolean) => void): Subscription {
    return this.signingSubject.subscribe(action);
  }

  public isSignedIn(): boolean {
    return this.getKey() !== '';
   }

  public getKey(): string {
    const key = localStorage.getItem(StorageItem.AuthKey);

    return key === null ? '' : key;
  }

  private setKey(token: Token): void {
    if (token.token !== '') {
      localStorage.setItem(StorageItem.AuthKey, token.token);
    }
  }

  private removeKey(): void {
    localStorage.removeItem(StorageItem.AuthKey);
  }

  private emitNavigate(getLandingPage: (landing: LandingRoute) => Path = (l): Path => l.Default): void {
    this.signingSubject.next(this.isSignedIn());
    this.navigator.navigate(b => b
      .to(r => r.Landing)
      .toPath(getLandingPage));
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Token } from '../models/token';
import { User } from '../models/user';
import { StorageItem } from '../shared/util/constants';
import { Navigator } from '../shared/util/routing/navigator';
import { Path } from '../shared/util/routing/path';
import { LandingRoute } from '../shared/util/routing/routing-paths';

import { UserService } from './data/user/user.service';
import { tokenName } from '@angular/compiler';

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

  public refresh(): void {
    const token: Token = {
      authToken: this.getKey(false),
      refreshToken: this.getKey(true),
    };

    if (token.authToken === '' || token.refreshToken === '') {
      return;
    }

    this.service.refresh(token).subscribe((newToken: Token) => {
      this.setKey(newToken);
    });
  }

  public subscribe(action: (next: boolean) => void): Subscription {
    return this.signingSubject.subscribe(action);
  }

  public isSignedIn(): boolean {
    return this.getKey() !== '';
  }

  public getKey(isRefresh: boolean = false): string {
    const key = localStorage.getItem(isRefresh ? StorageItem.RefreshKey : StorageItem.AuthKey);

    return key === null ? '' : key;
  }

  private setKey(token: Token): void {
    if (token.authToken !== '') {
      localStorage.setItem(StorageItem.AuthKey, token.authToken);
    }

    if (token.refreshToken !== '') {
      localStorage.setItem(StorageItem.RefreshKey, token.refreshToken);
    }
  }

  private removeKey(): void {
    localStorage.removeItem(StorageItem.AuthKey);
    localStorage.removeItem(StorageItem.RefreshKey);
  }

  private emitNavigate(getLandingPage: (landing: LandingRoute) => Path = (l): Path => l.Default): void {
    this.signingSubject.next(this.isSignedIn());
    this.navigator.navigate(b => b.to(r => r.Landing).toPath(getLandingPage));
  }
}

import { Injectable, EventEmitter } from '@angular/core';
import { UserService } from './data/user/user.service';
import { User } from '../models/user';
import { Token } from '../models/token';
import { StorageItem, RoutePath } from '../app.module';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigningService {

  private signingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isSignedIn());

  constructor(private service: UserService, private router: Router) {
   }

  public signIn(user: User): void {
    this.service.auth(user).subscribe((token: Token) => {
      this.setKey(token);
      this.emitNavigate();
    });
  }

  public signUp(user: User): void {
    this.service.create(user).subscribe((token: Token) => {
      this.setKey(token);
      this.emitNavigate();
    });
  }

  public signOut(): void {
    this.removeKey();
    this.emitNavigate(RoutePath.UnAuth);
  }

  public subscribe(action: (next: boolean) => void): Subscription {
    return this.signingSubject.subscribe(action);
  }

  public isSignedIn(): boolean {
    if (this.getKey()) {
      return true;
    } else {
      return false;
    }
  }

  public getKey(): string {
    return localStorage.getItem(StorageItem.AuthKey);
  }

  private setKey(token: Token): void {
    if (token.token) {
      localStorage.setItem(StorageItem.AuthKey, token.token);
    }
  }

  private removeKey(): void {
    localStorage.removeItem(StorageItem.AuthKey);
  }

  private emitNavigate(route: string = RoutePath.Home): void {
    this.signingSubject.next(this.isSignedIn());
    this.router.navigate([route]);
  }
}

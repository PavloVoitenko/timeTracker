import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SigningService } from '../signing.service';
import { RoutePath } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  isSignedIn: boolean;

  constructor(private signingService: SigningService, private router: Router) {
    signingService.subscribe((next: boolean) => this.isSignedIn = next);
   }

  public canActivate(): boolean {

    if (!this.isSignedIn) {
      this.router.navigate([RoutePath.UnAuth]);
    }

    return this.isSignedIn;
  }
}

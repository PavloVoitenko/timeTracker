import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Navigator } from '../../shared/util/routing/navigator';
import { SigningService } from '../signing.service';

/**
 * Authorization guard
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  public isSignedIn: boolean;

  public constructor(private readonly signingService: SigningService, private readonly navigator: Navigator) {
    signingService.subscribe((next: boolean) => this.isSignedIn = next);
   }

  public async canActivate(): Promise<boolean> {
    if (!this.isSignedIn) {
      await this.navigator.navigate(b => b
        .to(r => r.Landing)
        .toPath(l => l.Unauthorized));
    }

    return this.isSignedIn;
  }
}

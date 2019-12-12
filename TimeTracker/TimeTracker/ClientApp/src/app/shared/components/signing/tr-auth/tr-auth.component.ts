import { Component, Input, OnInit } from '@angular/core';

import { SigningService } from '../../../../services/signing.service';
import { Navigator } from '../../../util/routing/navigator';

/**
 * Authorization buttons component
 */
@Component({
  selector: 'tr-auth',
  styleUrls: ['./tr-auth.component.styl'],
  templateUrl: './tr-auth.component.html',
})
export class AuthComponent implements OnInit {
  @Input() public isSignIn: boolean;

  public isSignedIn: boolean;

  public buttonText: string;

  public constructor(private readonly signingService: SigningService, private readonly navigator: Navigator) {}

  public ngOnInit(): void {
    this.signingService.subscribe((next: boolean) => {
      this.isSignedIn = next;

      this.buttonText = this.isSignedIn ? 'Sign Out' : this.isSignIn ? 'Sign In' : 'Sign Up';
    });
  }

  public onClick(): void {
    if (this.isSignedIn) {
      this.signingService.signOut();
    } else {
      this.navigator.navigate(b => b.to(r => r.Signing).toPath(s => (this.isSignIn ? s.In : s.Up)));
    }
  }
}

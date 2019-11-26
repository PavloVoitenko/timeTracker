import { Component, Input, OnInit } from '@angular/core';

import { User } from '../../../models/user';
import { SigningService } from '../../../services/signing.service';

/**
 * Signing form component
 */
@Component({
  selector: 'tr-signing-form',
  styleUrls: ['./tr-signing-form.component.styl'],
  templateUrl: './tr-signing-form.component.html',
})
export class SigningFormComponent implements OnInit {
  @Input() public isSignIn: boolean;

  public cardTitle: string;

  public model: User = new User();

  public constructor(private readonly signingService: SigningService) { }

  public ngOnInit(): void {
     this.cardTitle = this.isSignIn ? 'Sign In' : 'Sign Up';
  }

  public onSubmit(): void {
    if (this.isSignIn) {
      this.signingService.signIn(this.model);
    } else {
      this.signingService.signUp(this.model);
    }
  }

}

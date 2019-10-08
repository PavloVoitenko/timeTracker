import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { SigningService } from 'src/app/services/signing.service';

@Component({
  selector: 'tr-signing-form',
  templateUrl: './tr-signing-form.component.html',
  styleUrls: ['./tr-signing-form.component.css']
})
export class TrSigningFormComponent implements OnInit {

  @Input() isSignIn: boolean;

  model: User = new User();

  constructor(private signingService: SigningService) { }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.isSignIn) {
      this.signingService.signIn(this.model);
    } else {
      this.signingService.signUp(this.model);
    }
  }

}

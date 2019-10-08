import { Component, OnInit, Input } from '@angular/core';
import { SigningService } from 'src/app/services/signing.service';
import { RoutePath } from 'src/app/app.module';
import { Router } from '@angular/router';

@Component({
  selector: 'tr-auth',
  templateUrl: './tr-auth.component.html',
  styleUrls: ['./tr-auth.component.css']
})
export class AuthComponent implements OnInit {

  @Input() isSignIn: boolean;

  isSignedIn: boolean;

  buttonText: string;

  constructor(private signingService: SigningService, private router: Router) { }

  ngOnInit(): void {
    this.signingService.subscribe((next: boolean) => {
      this.isSignedIn = next;

      if (this.isSignedIn) {
        this.buttonText = 'Sign Out';
      } else {
        this.buttonText = this.isSignIn ? 'Sign In' : 'Sign Up';
      }
    })

  }

  public onClick(): void {
    if (this.isSignedIn) {
      this.signingService.signOut();
    } else {
      this.router.navigate([this.isSignIn ? RoutePath.SignIn : RoutePath.SignUp]);
    }
  }
}

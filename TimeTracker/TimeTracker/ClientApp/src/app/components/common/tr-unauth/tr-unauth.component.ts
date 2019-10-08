import { Component, OnInit } from '@angular/core';
import { SigningService } from 'src/app/services/signing.service';
import { Router } from '@angular/router';
import { RoutePath } from 'src/app/app.module';

@Component({
  selector: 'tr-unauth',
  templateUrl: './tr-unauth.component.html',
  styleUrls: ['./tr-unauth.component.css']
})
export class TrUnauthComponent implements OnInit {

  constructor(private signingService: SigningService, private router: Router ) { }

  ngOnInit() {
    if (this.signingService.isSignedIn()) {
      this.router.navigate([RoutePath.Home]);
    }
  }

}

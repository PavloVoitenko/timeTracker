import { Component, OnInit } from '@angular/core';
import { SigningService } from 'src/app/services/signing.service';

@Component({
  selector: 'tr-signing',
  templateUrl: './tr-signing.component.html',
  styleUrls: ['./tr-signing.component.css']
})
export class TrSigningComponent implements OnInit {

  isSignedIn: boolean;

  constructor(private signingService: SigningService) { }

  ngOnInit() {
    this.signingService.subscribe((next: boolean) => this.isSignedIn = next);
  }

}

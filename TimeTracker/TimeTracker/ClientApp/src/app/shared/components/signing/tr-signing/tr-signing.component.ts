import { Component, OnInit } from '@angular/core';

import { SigningService } from '../../../../services/signing.service';

/**
 * Signing component
 */
@Component({
  selector: 'tr-signing',
  styleUrls: ['./tr-signing.component.styl'],
  templateUrl: './tr-signing.component.html',
})
export class SigningComponent implements OnInit {
  public isSignedIn: boolean;

  public constructor(private readonly signingService: SigningService) {}

  public ngOnInit(): void {
    this.signingService.subscribe((next: boolean) => (this.isSignedIn = next));
  }
}

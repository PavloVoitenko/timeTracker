import { Component, OnInit } from '@angular/core';

import { SigningService } from '../../../services/signing.service';
import { Navigator } from '../../../shared/util/routing/navigator';

/**
 * Unauthorized screen component
 */
@Component({
  selector: 'tr-unauth',
  styleUrls: ['./tr-unauth.component.styl'],
  templateUrl: './tr-unauth.component.html',
})
export class UnauthComponent implements OnInit {

  public cardTitle = 'Whoops!';
  public cardSubtitle = 'It seems that you are not authorized.';

  public constructor(private readonly signingService: SigningService, private readonly navigator: Navigator) { }

  public async ngOnInit(): Promise<void> {
    if (this.signingService.isSignedIn()) {
      await this.navigator.navigate(b => b
        .to(p => p.Landing)
        .toDefault());
    }
  }

}

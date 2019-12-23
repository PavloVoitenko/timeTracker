import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

import { SigningService } from './services/signing.service';
import { IMenuItem } from './shared/components/tr-navbar/tr-navbar.component';
import { TOKEN_REFRESH_INTERVAL } from './shared/util/constants';

/**
 * Main application component
 */
@Component({
  selector: 'tr-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public navigationItems: IMenuItem[] = [
    {
      getTarget: (b): string[] => b.to(r => r.Tracking).toDefault(),
      name: 'Tracking',
    },
    {
      getTarget: (b): string[] => b.to(r => r.Report).toDefault(),
      name: 'Report',
    },
  ];

  public constructor(private readonly signingService: SigningService) {}

  public ngOnInit(): void {
    timer(TOKEN_REFRESH_INTERVAL).subscribe(() => {
      this.signingService.refresh();
    });
  }
}

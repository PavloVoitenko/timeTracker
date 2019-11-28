import { Component } from '@angular/core';

import { IMenuItem } from './shared/components/tr-navbar/tr-navbar.component';

/**
 * Main application component
 */
@Component({
  selector: 'tr-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public navigationItems: IMenuItem[] = [
    {
      getTarget: (b): string[] => b
        .to(r => r.Tracking)
        .toDefault(),
      name: 'Tracking',

    },
    {
      getTarget: (b): string[] => b
        .to(r => r.Report)
        .toDefault(),
      name: 'Report',
    },
  ];

}

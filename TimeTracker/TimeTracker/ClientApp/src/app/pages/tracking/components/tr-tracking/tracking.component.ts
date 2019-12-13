import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TrackingSettings } from '../../util/tr-settings';

/**
 * Tracking  tabs
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tr-tracking',
  styleUrls: ['./tracking.component.styl'],
  templateUrl: './tracking.component.html',
})
export class TrackingComponent {
  public currentSettings: TrackingSettings;

  public setSettings(newSettings: TrackingSettings): void {
    this.currentSettings = { ...newSettings };
  }
}

import { Component, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TrackingSettings } from '../../util/tr-settings';

/**
 * Component with settings of tracking screen
 */
@Component({
  selector: 'tr-tracking-settings',
  styleUrls: ['./tr-tracking-settings.component.styl'],
  templateUrl: './tr-tracking-settings.component.html',
})
export class TrackingSettingsComponent {

  public settings = TrackingSettings.Default;

  @Output() public settingsChanged: BehaviorSubject<TrackingSettings> = new BehaviorSubject<TrackingSettings>(this.settings);

  public onSubmit(): void {
    this.settingsChanged.next(this.settings);
  }
}

import { Component, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DateOptions, TrackingSettings, ViewOptions } from '../../../util/tr-settings';

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

  public onDatesChanged(dateOptions: DateOptions): void {
    this.settings.dateOptions = dateOptions;
    this.notify();
  }

  public onViewChanged(viewOptions: ViewOptions): void {
    this.settings.viewOptions = viewOptions;
    this.notify();
  }

  private notify(): void {
    this.settingsChanged.next(this.settings);
  }
}

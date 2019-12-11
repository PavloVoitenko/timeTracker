import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';

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

  public constructor(private readonly changeDetectorRef: ChangeDetectorRef) { }

  public setSettings(newSettings: TrackingSettings): void {
    this.currentSettings = { ...newSettings };
  }
}

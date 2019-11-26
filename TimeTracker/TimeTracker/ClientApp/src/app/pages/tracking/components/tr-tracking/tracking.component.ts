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
export class TrackingComponent implements AfterViewInit {
  @ViewChild(MatAccordion, { static: false }) public accordion: MatAccordion;

  public currentSettings: TrackingSettings;

  public constructor(private readonly changeDetectorRef: ChangeDetectorRef) { }

  public ngAfterViewInit(): void {
    this.accordion.openAll();
    this.changeDetectorRef.detectChanges();
  }

  public setSettings(newSettings: TrackingSettings): void {
    this.currentSettings = { ...newSettings };
  }
}

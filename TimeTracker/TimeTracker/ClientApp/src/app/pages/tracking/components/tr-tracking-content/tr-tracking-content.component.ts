import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardLayoutService } from '../../services/card-layout.service';
import { CardLayout } from '../../util/layout';
import { TrackingSettings } from '../../util/tr-settings';

/**
 * Content of the tracking tabs
 */
@Component({
  selector: 'tr-tracking-content',
  styleUrls: ['./tr-tracking-content.component.styl'],
  templateUrl: './tr-tracking-content.component.html',
})
export class TrackingContentComponent implements OnChanges {
  @Input() public settings: TrackingSettings;

  public layout: CardLayout = new CardLayout();

  public constructor(private readonly layoutService: CardLayoutService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    this.layout = this.layoutService.createLayout(this.settings);
  }
}

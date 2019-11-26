import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { Tracking } from '../../../../models/tracking';
import { ColumnDataType } from '../../../../shared/components/tr-grid/util/column';
import { Datasource } from '../../../../shared/components/tr-grid/util/datasource';
import { ILooseObject } from '../../../../shared/util/loose-object';
import { TrackingDataService } from '../../services/tracking-data.service';
import { CardOptions } from '../../util/tr-card-options';

/**
 * Tracking card
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tr-tracking-card',
  styleUrls: ['./tr-tracking-card.component.styl'],
  templateUrl: './tr-tracking-card.component.html',
})
export class TrackingCardComponent implements OnChanges {

  @Input() public cardOptions: CardOptions;

  public dataSource: Datasource<Tracking>;

  private previousSubscription: Subscription = Subscription.EMPTY;

  public constructor(private readonly trackingData: TrackingDataService, private readonly changeDetectorRef: ChangeDetectorRef) {
    this.initDataSource([ new Tracking() ]);
   }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.previousSubscription.closed) {
      this.previousSubscription.unsubscribe();
    }

    this.previousSubscription = this.trackingData
      .get(this.cardOptions.fromDate)
      .subscribe((trackings: Tracking[]) => {
        this.initDataSource(trackings, true);
    });
  }

  private initDataSource(trackings: Tracking[], detectChanges: boolean = false): void {
    this.dataSource = Datasource.for(trackings, Tracking).withColumns([
      { toDefinition: (t): ILooseObject => ({ 'Task name': t.taskName }) },
      { toDefinition: (t): ILooseObject => ({ From: t.startTime }), options: { displayName: 'From', dataType: ColumnDataType.Time } },
      { toDefinition: (t): ILooseObject => ({ To: t.endTime }), options: { displayName: 'To', dataType: ColumnDataType.Time } },
    ]);

    if (detectChanges) {
      this.changeDetectorRef.detectChanges();
    }
  }
}

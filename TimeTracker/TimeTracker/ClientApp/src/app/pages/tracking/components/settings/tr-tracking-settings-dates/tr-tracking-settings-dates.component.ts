import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { DateOptions } from '../../../util/tr-settings';

/**
 * This component contains means to update tracking's date options
 */
@Component({
  selector: 'tr-tracking-settings-dates',
  styleUrls: ['./tr-tracking-settings-dates.component.styl'],
  templateUrl: './tr-tracking-settings-dates.component.html',
})
export class TrackingSettingsDatesComponent implements OnInit {
  public dateOptions: DateOptions = DateOptions.Default;

  @Output() public changed = new BehaviorSubject<DateOptions>(this.dateOptions);

  public datesForm = new FormGroup({
    endDate: new FormControl({ disabled: true }),
    startDate: new FormControl({ disabled: true }),
  });

  public ngOnInit(): void {
    this.patchDates();

    for (const controlName of Object.keys(this.datesForm.controls)) {
      const control = this.datesForm.controls[controlName];
      control.valueChanges.subscribe(() => {
        this.onChanged();
      });
    }
  }

  public onChanged(): void {
    // tslint:disable-next-line: no-unsafe-any
    this.updateDates(this.datesForm.getRawValue());
    this.patchDates();

    this.changed.next(this.dateOptions);
  }

  public moveForward(): void {
    this.movePeriod(1);
  }

  public moveBackward(): void {
    this.movePeriod(-1);
  }

  private movePeriod(multiplier: 1 | -1): void {
    const movePeriod = 'days';
    const period = multiplier * (this.dateOptions.endDate.diff(this.dateOptions.startDate, movePeriod) + 1);

    this.dateOptions.startDate.add(period, movePeriod);
    this.dateOptions.endDate.add(period, movePeriod);

    this.onChanged();
  }

  private patchDates(): void {
    this.datesForm.patchValue(this.dateOptions, { emitEvent: false });
  }

  private updateDates(newOptions: DateOptions): void {
    this.dateOptions = newOptions;

    this.dateOptions.startDate.startOf('W');
    if (this.dateOptions.startDate.isAfter(this.dateOptions.endDate)) {
      this.dateOptions.endDate = this.dateOptions.startDate.clone();
    }
    this.dateOptions.endDate.endOf('W');
  }
}

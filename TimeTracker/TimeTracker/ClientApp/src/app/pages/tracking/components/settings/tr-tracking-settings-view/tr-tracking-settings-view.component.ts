import { Component, Output, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PopoverService } from '../../../../../shared/components/tr-popover/services/popover.service';
import { ViewOptions } from '../../../util/tr-settings';
import { TrackingSettingsViewFormComponent } from '../tr-tracking-settings-view-form/tr-tracking-settings-view-form.component';

/**
 * This component contains means to change view options of trackings
 */
@Component({
  selector: 'tr-tracking-settings-view',
  styleUrls: ['./tr-tracking-settings-view.component.styl'],
  templateUrl: './tr-tracking-settings-view.component.html',
})
export class TrackingSettingsViewComponent {
  public viewOptions = ViewOptions.Default;

  @Output() public changed = new BehaviorSubject<ViewOptions>(this.viewOptions);

  public constructor(private readonly popoverService: PopoverService) {}

  public showPopover(target: HTMLElement): void {
    this.popoverService
      .open<ViewOptions>(TrackingSettingsViewFormComponent, target, { data: this.viewOptions })
      .afterClosed()
      .subscribe(vo => {
        this.viewOptions = vo;
        this.changed.next(this.viewOptions);
      });
  }
}

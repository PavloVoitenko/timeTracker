import { Component, Inject, Optional } from '@angular/core';

import { POPOVER_DATA } from '../../../../../shared/components/tr-popover/services/popover.service';
import { PopoverRef } from '../../../../../shared/components/tr-popover/util/popover-ref';
import { PeriodOption } from '../../../util/tr-card-options';
import { ViewOptions } from '../../../util/tr-settings';

/**
 * This component is a form to select View options for tracking
 */
@Component({
  selector: 'tr-tr-tracking-settings-view-form',
  styleUrls: ['./tr-tracking-settings-view-form.component.styl'],
  templateUrl: './tr-tracking-settings-view-form.component.html',
})
export class TrackingSettingsViewFormComponent {
  public readonly viewOptionsEnum = PeriodOption;

  public constructor(
    @Optional() @Inject(POPOVER_DATA) public data: ViewOptions = ViewOptions.Default,
    private readonly popoverRef: PopoverRef<ViewOptions>,
  ) {}
}

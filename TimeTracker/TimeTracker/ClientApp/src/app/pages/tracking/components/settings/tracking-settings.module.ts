import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SharedModule } from '../../../../shared/shared.module';

import { TrackingSettingsDatesComponent } from './tr-tracking-settings-dates/tr-tracking-settings-dates.component';
import { TrackingSettingsViewFormComponent } from './tr-tracking-settings-view-form/tr-tracking-settings-view-form.component';
import { TrackingSettingsViewComponent } from './tr-tracking-settings-view/tr-tracking-settings-view.component';
import { TrackingSettingsComponent } from './tr-tracking-settings/tr-tracking-settings.component';

/**
 * This module contains components for tracking settings
 */
@NgModule({
  declarations: [
    TrackingSettingsComponent,
    TrackingSettingsDatesComponent,
    TrackingSettingsViewFormComponent,
    TrackingSettingsViewComponent,
  ],
  entryComponents: [TrackingSettingsViewFormComponent],
  exports: [TrackingSettingsComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,

    SharedModule,

    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
})
export class TrackingSettingsModule {}

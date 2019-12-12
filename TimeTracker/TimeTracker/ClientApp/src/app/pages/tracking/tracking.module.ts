import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Route, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services/guards/auth-guard.service';
import { SharedModule } from '../../shared/shared.module';
import { TrackingPath } from '../../shared/util/routing/routing-paths';

import { TrackingSettingsModule } from './components/settings/tracking-settings.module';
import { TrackingCardComponent } from './components/tr-tracking-card/tr-tracking-card.component';
import { TrackingContentComponent } from './components/tr-tracking-content/tr-tracking-content.component';
import { TrackingComponent } from './components/tr-tracking/tracking.component';

const routes: Route[] = [
  {
    canActivate: [AuthGuardService],
    component: TrackingComponent,
    path: TrackingPath.Default.route,
  },
];

/**
 * Tracking screen module
 */
@NgModule({
  declarations: [
    TrackingComponent,
    TrackingCardComponent,
    TrackingContentComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    SharedModule,
    TrackingSettingsModule,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB',
    },
  ],
})
export class TrackingModule {}

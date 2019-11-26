import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatButtonModule, MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { Route, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services/guards/auth-guard.service';
import { SharedModule } from '../../shared/shared.module';
import { TrackingPath } from '../../shared/util/routing/routing-paths';

import { TrackingCardComponent } from './components/tr-tracking-card/tr-tracking-card.component';
import { TrackingContentComponent } from './components/tr-tracking-content/tr-tracking-content.component';
import { TrackingSettingsComponent } from './components/tr-tracking-settings/tr-tracking-settings.component';
import { TrackingComponent } from './components/tr-tracking/tracking.component';

const routes: Route[] = [
    { path: TrackingPath.Default.route, component: TrackingComponent, canActivate: [ AuthGuardService ] },
];

/**
 * Tracking screen module
 */
@NgModule({
    declarations: [
        TrackingComponent,
        TrackingCardComponent,
        TrackingContentComponent,
        TrackingSettingsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,

        SharedModule,

        MatExpansionModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatMomentDateModule,
    ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class TrackingModule {}

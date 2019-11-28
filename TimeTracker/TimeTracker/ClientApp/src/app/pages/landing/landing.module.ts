import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services/guards/auth-guard.service';
import { SharedModule } from '../../shared/shared.module';
import { LandingPath } from '../../shared/util/routing/routing-paths';

import { HomeComponent } from './tr-home/tr-home.component';
import { UnauthComponent } from './tr-unauth/tr-unauth.component';

const routes: Route[] = [
    { path: LandingPath.Default.route, component: HomeComponent, canActivate: [ AuthGuardService ] },
    { path: LandingPath.Unauthorized.route, component: UnauthComponent },
];

/**
 * Landing pages module
 */
@NgModule({
    declarations: [
        HomeComponent,
        UnauthComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
    ],
})
export class LandingModule {}

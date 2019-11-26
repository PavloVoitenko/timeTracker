import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services/guards/auth-guard.service';
import { ReportPath } from '../../shared/util/routing/routing-paths';

import { ReportComponent } from './tr-report/tr-report.component';

const routes: Route[] = [
    { path: ReportPath.Default.route, component: ReportComponent, canActivate: [ AuthGuardService ] },
];

/**
 * Report module
 */
@NgModule({
    declarations: [
        ReportComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
    ],
})
export class ReportModule {}

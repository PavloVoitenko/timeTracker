// tslint:disable: typedef

import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { RootPath } from './shared/util/routing/routing-paths';

const routes: Route[] = [
  { path: RootPath.Default.route, loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
  { path: RootPath.Signing.route, loadChildren: () => import('./pages/signing/signing.module').then(m => m.SigningModule) },
  { path: RootPath.Report.route, loadChildren: () => import('./pages/report/report.module').then(m => m.ReportModule) },
  { path: RootPath.Tracking.route, loadChildren: () => import('./pages/tracking/tracking.module').then(m => m.TrackingModule) },
  { path: RootPath.Any.route, redirectTo: RootPath.Default.route },
];

/**
 * This module handles application's routing and exports RouterModule
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }

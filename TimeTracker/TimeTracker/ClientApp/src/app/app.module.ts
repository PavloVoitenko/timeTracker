import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrNavbarComponent } from './components/common/tr-navbar/tr-navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AuthComponent } from './components/signing/tr-auth/tr-auth.component';
import { SignInComponent as TrSignInComponent } from './components/signing/tr-sign-in/sign-in.component';
import { SignUpComponent as TrSignUpComponent } from './components/signing/tr-sign-up/sign-up.component';
import { TrackingComponent as TrTrackingComponent } from './components/tracking/tr-tracking/tracking.component';
import { ReportComponent as TrReportComponent } from './components/report/report/report.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { TrSigningFormComponent } from './components/signing/tr-signing-form/tr-signing-form.component';
import { TrSigningComponent } from './components/signing/tr-signing/tr-signing.component';
import { TrHomeComponent } from './components/common/tr-home/tr-home.component';
import { TrUnauthComponent } from './components/common/tr-unauth/tr-unauth.component';

export enum RoutePath {
  Home = 'hub',
  Tracking = 'tracking',
  SignIn = 'signIn',
  SignUp = 'signUp',
  Report = 'report',
  UnAuth = '',
  Any = '**'
}

const router: Route[] = [
  { path: RoutePath.UnAuth, component: TrUnauthComponent },
  { path: RoutePath.Home, component: TrHomeComponent, canActivate: [ AuthGuardService ] },
  { path: RoutePath.Report, component: TrReportComponent, canActivate: [ AuthGuardService ] },
  { path: RoutePath.SignIn, component: TrSignInComponent },
  { path: RoutePath.SignUp, component: TrSignUpComponent },
  { path: RoutePath.Tracking, component: TrTrackingComponent, canActivate: [ AuthGuardService ] },
  { path: RoutePath.Any, redirectTo: RoutePath.Home }
];

export enum StorageItem {
  AuthKey = 'AuthKey'
}

@NgModule({
  declarations: [
    AppComponent,
    TrNavbarComponent,
    AuthComponent,
    TrSignInComponent,
    TrSignUpComponent,
    TrTrackingComponent,
    TrReportComponent,
    TrSigningFormComponent,
    TrSigningComponent,
    TrHomeComponent,
    TrUnauthComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(router),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

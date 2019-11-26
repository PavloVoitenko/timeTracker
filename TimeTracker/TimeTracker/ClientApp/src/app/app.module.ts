import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Injector, NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportModule } from './pages/report/report.module';
import { TrackingModule } from './pages/tracking/tracking.module';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { LocatorService } from './services/locator.service';
import { SharedModule } from './shared/shared.module';
import { IFormattingService, FormattingService } from './shared/components/tr-grid/services/formatting.service';

/**
 * Main application module
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    SharedModule.forRoot(),
    ReportModule,
    TrackingModule,
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule {
  public constructor(private readonly injector: Injector) {
    LocatorService.injector = injector;
  }
}

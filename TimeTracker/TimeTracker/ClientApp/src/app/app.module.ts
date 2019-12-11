import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { ErrorInterceptor } from './services/interceptors/error.interceptor';
import { LocatorService } from './services/locator.service';
import { SharedModule } from './shared/shared.module';

/**
 * Main application module
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        SharedModule.forRoot(),

        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        ToastrModule.forRoot(),
    ],
    providers: [
        {
            multi: true,
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
        },
        {
            multi: true,
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
        },
    ],
})
export class AppModule {
    public constructor(private readonly injector: Injector) {
        LocatorService.injector = injector;
    }
}

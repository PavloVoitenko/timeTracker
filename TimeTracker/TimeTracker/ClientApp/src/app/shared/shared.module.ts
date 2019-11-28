import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './components/signing/tr-auth/tr-auth.component';
import { SigningComponent } from './components/signing/tr-signing/tr-signing.component';
import { CardComponent } from './components/tr-card/tr-card.component';
import { FormattingService, FormattingServiceBase } from './components/tr-grid/services/formatting.service';
import { GridComponent } from './components/tr-grid/tr-grid.component';
import { NavbarComponent } from './components/tr-navbar/tr-navbar.component';

/**
 * Common components for application
 */
@NgModule({
    declarations: [
        CardComponent,
        NavbarComponent,
        GridComponent,

        AuthComponent,
        SigningComponent,
    ],
    exports: [
        CardComponent,
        NavbarComponent,
        GridComponent,

        AuthComponent,
        SigningComponent,
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatCardModule,
        RouterModule,
        MatButtonModule,
    ],
})
export class SharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                {
                    provide: FormattingServiceBase,
                    useClass: FormattingService,
                }
            ]
        }
    }
}

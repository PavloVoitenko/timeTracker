import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './components/signing/tr-auth/tr-auth.component';
import { SigningComponent } from './components/signing/tr-signing/tr-signing.component';
import { CardComponent } from './components/tr-card/tr-card.component';
import {
    FormattingService,
    FormattingServiceBase,
} from './components/tr-grid/services/formatting.service';
import { GridComponent } from './components/tr-grid/tr-grid.component';
import { NavbarComponent } from './components/tr-navbar/tr-navbar.component';
import { PopoverArrowDirective } from './components/tr-popover/directives/popover-arrow.directive';
import { PopoverCloseDirective } from './components/tr-popover/directives/popover-close.directive';
import { PopoverComponent } from './components/tr-popover/tr-popover.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';

/**
 * Common components for application
 */
@NgModule({
    declarations: [
        CardComponent,
        NavbarComponent,
        GridComponent,
        PopoverComponent,

        AuthComponent,
        SigningComponent,

        PopoverArrowDirective,
        PopoverCloseDirective,

        EnumToArrayPipe,
    ],
    entryComponents: [PopoverComponent],
    exports: [
        CommonModule,

        CardComponent,
        NavbarComponent,
        GridComponent,
        PopoverComponent,

        AuthComponent,
        SigningComponent,

        EnumToArrayPipe,

        PopoverCloseDirective,

        MatSelectModule, // provide MAT_SELECT_SCROLL_STRATEGY FFS
    ],
    imports: [
        CommonModule,
        RouterModule,
        OverlayModule,
        PortalModule,

        MatToolbarModule,
        MatCardModule,
        MatButtonModule,

        MatSelectModule,
    ],
})
export class SharedModule {
    public static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                {
                    provide: FormattingServiceBase,
                    useClass: FormattingService,
                },
            ],
        };
    }
}

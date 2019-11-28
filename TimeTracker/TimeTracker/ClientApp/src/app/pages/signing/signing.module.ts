import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { Route, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { SigningPath } from '../../shared/util/routing/routing-paths';

import { SignInComponent } from './tr-sign-in/sign-in.component';
import { SignUpComponent } from './tr-sign-up/sign-up.component';
import { SigningFormComponent } from './tr-signing-form/tr-signing-form.component';

const routes: Route[] = [
    { path: SigningPath.In.route, component: SignInComponent },
    { path: SigningPath.Up.route, component: SignUpComponent },
    { path: SigningPath.Default.route, redirectTo: SigningPath.In.route },
];

/**
 * Module with forms to sign in and sign up
 */
@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        SigningFormComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,

        SharedModule,

        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
})
export class SigningModule {}

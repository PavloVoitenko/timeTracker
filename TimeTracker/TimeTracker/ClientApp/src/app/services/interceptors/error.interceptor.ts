import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SigningService } from '../signing.service';
import { Error } from '../../models/error';

export enum StatusCode {
    NotAuthorized = 401,
    Success = 200,
}

/**
 * This class catches HTTP errors and processes them
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    public constructor(private readonly toastr: ToastrService, private readonly signingService: SigningService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                this.resolveError(error.error);

                return EMPTY;
            }));
    }

    private resolveError(error: Error): string {
        let message = '';

        switch (error.StatusCode) {
            case StatusCode.NotAuthorized:
                this.signingService.signOut();
                message = 'You are not authorized';
                break;
            default:
                message = error.Message;
        }
        this.toastr.error(message, 'An error occurred!');

        return message;
    }
}

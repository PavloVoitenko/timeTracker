import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StorageItem } from '../../shared/util/constants';

/**
 * Intercepts http requests and adds auth header
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const key = localStorage.getItem(StorageItem.AuthKey);
        let newReq = req;

        if (key !== '') {
            const headers = req.headers.append('Authorization', `Bearer ${key}`);
            newReq = req.clone({ headers });
        }

        return next.handle(newReq);
    }
}

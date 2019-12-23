import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Token } from '../../../models/token';
import { User } from '../../../models/user';
import { DataBaseService } from '../data-base-service.service';

/**
 * Service for providing user information
 */
@Injectable({
  providedIn: 'root',
})
export class UserService extends DataBaseService {
  public getAddress(): string {
    return '/api/user/';
  }

  public create(user: User): Observable<Token> {
    return this.http.post<Token>(this.getAddress(), user, { headers: this.appJson });
  }

  public auth(user: User): Observable<Token> {
    const authSuffix = 'auth/';

    return this.http.post<Token>(this.getAddress() + authSuffix, user, { headers: this.appJson });
  }

  public refresh(token: Token): Observable<Token> {
    const refreshSuffix = 'refresh/';

    return this.http.post<Token>(this.getAddress() + refreshSuffix, token, { headers: this.appJson });
  }
}

import { Injectable } from '@angular/core';
import { DataBaseService } from '../data-base-service.service';
import { User } from 'src/app/models/user';
import { Token } from 'src/app/models/token';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataBaseService {

  public getAddress(): string {
    return '/api/user/';
  }

  public create(user: User): Observable<Token> {
    return this.http.post<Token>(this.getAddress(), user, { headers: this.appJson });
  }

  public auth(user: User): Observable<Token> {
    const authPostfix = 'auth/';
    return this.http.post<Token>(this.getAddress() + authPostfix, user, { headers: this.appJson });
  }
}

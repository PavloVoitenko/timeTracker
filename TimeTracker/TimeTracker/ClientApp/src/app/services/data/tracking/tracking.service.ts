import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';

import { Tracking } from '../../../models/tracking';
import { DataBaseService } from '../data-base-service.service';

/**
 * Service for providing user information
 */
@Injectable({
    providedIn: 'root',
  })
export class TrackingService extends DataBaseService {

    public getAddress(): string {
        return '/api/tracking';
    }

    public create(tracking: Tracking): Observable<Tracking> {
        return this.http.post<Tracking>(this.getAddress(), tracking, { headers: this.appJson });
    }

    public get(periodStart: moment.Moment, periodEnd: moment.Moment): Observable<Tracking[]> {
        return this.http.get<Tracking[]>(this.getAddress(), {
             params: { periodStart: periodStart.format('MM-DD-YYYY'), periodEnd: periodEnd.format('MM-DD-YYYY') },
        });
    }

    public delete(id: number): Observable<object> {
        return this.http.delete(`${this.getAddress()}/${id}`);
    }
}
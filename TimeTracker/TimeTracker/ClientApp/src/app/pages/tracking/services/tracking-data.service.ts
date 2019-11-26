import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tracking } from '../../../models/tracking';
import { TrackingService } from '../../../services/data/tracking/tracking.service';
import { DataCache } from '../../../shared/util/cache';

export interface IMinMax<T> {
    min: T;
    max: T;
}

/**
 * Cache of tracking lines
 */
@Injectable({
    providedIn: 'root',
})
export class TrackingDataService extends DataCache<moment.Moment, Tracking[]> {

    public constructor(private readonly trackingService: TrackingService) {
        super();
     }

    protected toArray(keyFrom: moment.Moment, keyTo: moment.Moment): moment.Moment[] {
        const result: moment.Moment[] = [ keyTo ];
        const currentMoment = keyFrom.clone();

        while (currentMoment.isBefore(keyTo)) {
            result.push(currentMoment);
            currentMoment.add('D');
        }

        return result;
    }

    protected getData(key: moment.Moment): Observable<Tracking[]> {
        return this.trackingService.get(key, key);
    }
    protected getDataArray(keys: moment.Moment[]): Observable<boolean> {
        const edges: IMinMax<moment.Moment> = keys.reduce<IMinMax<moment.Moment>>(
            (prev: IMinMax<moment.Moment>, key) => {
                if (key.isBefore(prev.min)) {
                    prev.min = key;
                } else if (key.isAfter(prev.max)) {
                    prev.max = key;
                }

                return prev;
            },
            { min: moment.max(), max: moment.min() },
        );

        const result = this.trackingService.get(edges.min, edges.max);
        result.subscribe(
            trackings => {
                this.importTrackings(trackings);
        });

        return result.pipe(map(() => true));
    }

    private importTrackings(trackings: Tracking[]): void {
        const groups = _.groupBy(trackings, (t: Tracking) => t.trackingDate);

        for (const group of Object.keys(groups)) {
            this.set(moment(group), groups[group]);
        }
    }
}

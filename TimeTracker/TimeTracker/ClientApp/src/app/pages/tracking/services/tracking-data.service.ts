import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Tracking } from '../../../models/tracking';
import { TrackingService } from '../../../services/data/tracking/tracking.service';
import { DataCache, IMinMax } from '../../../shared/util/cache/cache';
import { MomentCacheKeyProvider } from '../../../shared/util/cache/cache-key-provider';
import { MAX_DATE_NUMBER } from '../../../shared/util/constants';
import { DateOptions } from '../util/tr-settings';

/**
 * Cache of tracking lines
 */
@Injectable({
    providedIn: 'root',
})
export class TrackingDataService extends DataCache<moment.Moment, Tracking[]> {

    public constructor(private readonly trackingService: TrackingService) {
        super(new MomentCacheKeyProvider());
    }

    public preparePeriod(dateOptions: DateOptions): void {
        this.prepare(dateOptions.startDate, dateOptions.endDate);
    }

    protected toArray(keyFrom: moment.Moment, keyTo: moment.Moment): moment.Moment[] {
        const result: moment.Moment[] = [ ];
        if (keyFrom.isBefore(keyTo)) {
            const currentMoment = keyFrom.clone();
            while (currentMoment.isSameOrBefore(keyTo, 'day')) {
                result.push(currentMoment.clone());
                currentMoment.add(1, 'day');
            }
        }

        return result;
    }

    protected getData(key: moment.Moment): Observable<Tracking[]> {
        return this.trackingService.get(key, key);
    }
    protected getDataArray(keys: moment.Moment[]): Observable<void> {
        const edges: IMinMax<moment.Moment> = keys.reduce<IMinMax<moment.Moment>>(
            (prev: IMinMax<moment.Moment>, key) => {
                if (key.isBefore(prev.min)) {
                    prev.min = key;
                }

                if (key.isAfter(prev.max)) {
                    prev.max = key;
                }

                return prev;
            },
            { min: moment(MAX_DATE_NUMBER), max: moment(0) },
        );

        return this.trackingService.get(edges.min, edges.max).pipe(
            tap(trackings => { this.importTrackings(trackings, keys); }),
            map(() => {}),
        );
    }

    private importTrackings(trackings: Tracking[], keys: moment.Moment[]): void {
        const groups = _.groupBy(trackings, (t: Tracking) => t.trackingDate);

        for (const group of Object.keys(groups)) {
            this.set(moment(group), groups[group]);
        }

        for (const key of keys) {
            if (!this.has(key)) {
                this.set(key, []);
            }
        }
    }
}

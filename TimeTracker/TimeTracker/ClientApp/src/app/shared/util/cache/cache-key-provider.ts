import * as moment from 'moment';

import { MOMENT_DATE_FORMAT } from '../../../pages/tracking/util/tr.constants';

export interface ICacheKeyProvider<TKey> {
    getKey(key: TKey): string;
}

/**
 * This class provides a string representation for key value
 */
export class MomentCacheKeyProvider implements ICacheKeyProvider<moment.Moment> {
    public getKey(key: moment.Moment): string {
        return key.format(MOMENT_DATE_FORMAT);
    }
}

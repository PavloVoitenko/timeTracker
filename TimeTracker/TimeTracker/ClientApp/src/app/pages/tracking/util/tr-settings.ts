import * as moment from 'moment';

import { ViewOption } from './tr-card-options';

/**
 * Setting for content of tracking screen
 */
export class TrackingSettings {
    public startDate: moment.Moment;
    public endDate: moment.Moment;

    public viewOption: ViewOption;

    public static get Default(): TrackingSettings {
      return {
        endDate: moment().endOf('isoWeek'),
        startDate: moment().startOf('isoWeek'),
        viewOption: ViewOption.Day,
      };
    }
}
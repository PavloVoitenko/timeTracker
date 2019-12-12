import * as moment from 'moment';

import { PeriodOption } from './tr-card-options';

/**
 * This class contains date options
 */
export class DateOptions {
  public startDate: moment.Moment;
  public endDate: moment.Moment;

  public static get Default(): DateOptions {
    return {
      endDate: moment().endOf('isoWeek'),
      startDate: moment().startOf('isoWeek'),
    };
  }
}

/**
 * This class contains view options from tracking
 */
export class ViewOptions {
  public viewOption: PeriodOption;
  public skipEmptyDays: boolean;

  public static get Default(): ViewOptions {
    return {
      skipEmptyDays: true,
      viewOption: PeriodOption.Day,
    };
  }
}

/**
 * Setting for content of tracking screen
 */
export class TrackingSettings {
  public dateOptions: DateOptions;
  public viewOptions: ViewOptions;

  public static get Default(): TrackingSettings {
    return {
      dateOptions: DateOptions.Default,
      viewOptions: ViewOptions.Default,
    };
  }
}

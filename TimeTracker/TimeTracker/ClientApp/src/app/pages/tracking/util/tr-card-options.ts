import * as moment from 'moment';

import { MOMENT_DATE_FORMAT } from './tr.constants';

export enum PeriodOption {
    Day,
    Week,
    Month,
}

/**
 * Options for card visualizations
 */
export class CardOptions {
    public constructor(public view: PeriodOption, public fromDate: moment.Moment, public toDate: moment.Moment) { }

    public get title(): string {
        return this.fromDate.isSame(this.toDate, 'D') ?
            this.fromDate.format(MOMENT_DATE_FORMAT) :
            `${this.fromDate.format(MOMENT_DATE_FORMAT)} - ${this.toDate.format(MOMENT_DATE_FORMAT)}`;
    }
}

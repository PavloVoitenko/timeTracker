import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { MOMENT_DATE_FORMAT } from '../../../../pages/tracking/util/tr.constants';

import { ColumnDataType } from '../util/column';
import { TWO_DIGIT_NUMBER } from '../../../util/constants';

export interface IFormattingService {
    // tslint:disable-next-line: no-any
    format(value: any, dataType: ColumnDataType): string;
}

/**
 * This is a base class for formatting services
 */
export abstract class FormattingServiceBase implements IFormattingService {
    // tslint:disable-next-line: no-any
    public abstract format(value: any, dataType: ColumnDataType): string;
    protected abstract formatString(value: string): string;
    protected abstract formatDate(value: moment.Moment): string;
    protected abstract formatTime(value: Time): string;
    protected abstract formatNumber(value: number): string;
}

/**
 * This class handles formatting of grid's fields
 */
@Injectable()
export class FormattingService extends FormattingServiceBase {
    // tslint:disable-next-line: no-any
    public format(value: any, dataType: ColumnDataType): string {
        switch (dataType) {
            case ColumnDataType.String:
                return this.formatString(value as string);
            case ColumnDataType.Date:
                return this.formatDate(value as moment.Moment);
            case ColumnDataType.Time:
                return this.formatTime(value as Time);
            case ColumnDataType.Number:
                return this.formatNumber(value as number);
            default:
                throw Error('Data type is not supported');
        }
    }

    protected formatString(value: string): string {
        return value;
    }

    protected formatDate(value: moment.Moment): string {
        return value.format(MOMENT_DATE_FORMAT);
    }

    protected formatTime(value: Time): string {
        return `${value.hours}:${value.minutes < TWO_DIGIT_NUMBER ? '0' : ''}${value.minutes}`;
    }

    protected formatNumber(value: number): string {
        return value.toLocaleString();
    }
}

import { ILooseObject } from './loose-object';

export interface IObjectUtil {
    copy(from: ILooseObject, to: ILooseObject): void;
    // tslint:disable-next-line: no-any
    getFirstKey(obj: ILooseObject): any;
}

// tslint:disable-next-line: variable-name
export const ObjectUtil: IObjectUtil = {
    copy: (from: ILooseObject, to: ILooseObject): void => {
        for (const key of Object.keys(from)) {
            to[key] = from[key];
        }
    },

    // tslint:disable-next-line: no-any
    getFirstKey: (obj: ILooseObject): any => {
        for (const key of Object.keys(obj)) {
            return obj[key];
        }

        return '';
    },
};

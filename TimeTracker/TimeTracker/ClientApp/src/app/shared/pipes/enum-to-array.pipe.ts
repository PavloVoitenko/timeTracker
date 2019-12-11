import { Pipe, PipeTransform } from '@angular/core';

import { ILooseObject } from '../util/loose-object';

export interface IEnumObject {
    index: number;
    name: ILooseObject;
}

/**
 * This pipe transforms enum into array of id-value pairs
 */
@Pipe({ name: 'enumToArray' })
export class EnumToArrayPipe implements PipeTransform {
    public transform(value: ILooseObject): IEnumObject[] {
        return Object.keys(value).filter(e => !isNaN(+e)).map(o => ({ index: +o, name: value[o]}));
    }
}

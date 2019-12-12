import { InjectionToken } from '@angular/core';

import { LocatorService } from '../../../../services/locator.service';
import { ILooseObject } from '../../../util/loose-object';
import { ObjectUtil } from '../../../util/object.util';
import { FormattingServiceBase, IFormattingService } from '../services/formatting.service';

import { ColumnData } from './column';

export interface ITableHeader {
  key: string;
  displayName: string;
}

/**
 * Table data
 */
export class TableData<T> {
  public columnOptions: Array<ColumnData<T>> = [];

  private rowsList: T[];
  private readonly generic: new () => T;

  private readonly formatter: IFormattingService = LocatorService.injector.get(FormattingServiceBase);

  public constructor(entities: T[], type: new () => T) {
    this.generic = type;
    this.setRows(entities);
  }

  public get headers(): Iterable<ITableHeader> {
    return this.headersGenerator();
  }

  public get rows(): Iterable<ILooseObject> {
    return this.rowsGenerator();
  }

  public setRows(entities: T[]): void {
    this.rowsList = entities;
  }

  public addDataColumn(toDefinition: (entity: T) => ILooseObject): ColumnData<T> {
    return this.addColumn(toDefinition, false);
  }

  public addDisplayColumn(toDefinition: (entity: T) => ILooseObject): ColumnData<T> {
    return this.addColumn(toDefinition, true);
  }

  private addColumn(toDefinition: (entity: T) => ILooseObject, isDisplay: boolean): ColumnData<T> {
    const row = this.rowsList.length > 0 ? this.rowsList[0] : new this.generic();
    const columnObject: ILooseObject = toDefinition(row);

    if (Object.keys(columnObject).length !== 1) {
      throw new Error('Column definition can only have one property');
    }

    const key = Object.keys(columnObject)[0];
    const newColumn = new ColumnData<T>(key, toDefinition, isDisplay);
    this.columnOptions.push(newColumn);

    return newColumn;
  }

  private *headersGenerator(): Iterable<ITableHeader> {
    for (const column of this.columnOptions) {
      yield { key: column.key, displayName: column.options.displayName };
    }
  }

  private *rowsGenerator(): Iterable<ILooseObject> {
    for (const row of this.rowsList) {
      const result: ILooseObject = {};
      this.columnOptions.forEach(column => {
        result[column.key] = this.formatter.format(ObjectUtil.getFirstKey(column.toDefinition(row)), column.options.dataType);
      });

      yield result;
    }
  }
}

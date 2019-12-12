import { IColumnSetup } from './column';
import { TableData } from './table';

/**
 * Options for datasources
 */
export class DatasourceOptions {
  public tableName: string;
  public showHeader = true;
}

/**
 * Datasource definition
 */
export class Datasource<T> {
  public data: TableData<T>;
  public options: DatasourceOptions;

  public static for<T>(entities: T[], type: new () => T): Datasource<T> {
    const ds: Datasource<T> = new Datasource<T>();
    ds.data = new TableData<T>(entities, type);

    return ds;
  }

  public withOptions(options: DatasourceOptions): Datasource<T> {
    this.options = options;

    return this;
  }

  public withColumns(setups: Array<IColumnSetup<T>>): Datasource<T> {
    setups.forEach(setup => {
      const columnData = setup.isDisplay ? this.data.addDisplayColumn(setup.toDefinition) : this.data.addDataColumn(setup.toDefinition);
      columnData.with(setup.options);
    });

    return this;
  }
}

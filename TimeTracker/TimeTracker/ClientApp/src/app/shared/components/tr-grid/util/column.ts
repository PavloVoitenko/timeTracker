import { ILooseObject } from '../../../util/loose-object';
import { ObjectUtil } from '../../../util/object.util';

export enum EditableOption {
    Readonly,
    OnCreate,
    Editable,
}

export enum ColumnDataType {
    String,
    Time,
    Date,
    Number,
}

/**
 * Options for column
 */
export class ColumnOptions {
    public displayName: string;
    public dataType: ColumnDataType;
    public editable?: EditableOption;
    public visible?: boolean;
}

/**
 * Column data
 */
export class ColumnData<T> {
    public readonly key: string;
    public readonly toDefinition: (entity: T) => ILooseObject;
    public readonly isDisplay: boolean;

    public options: ColumnOptions;

    public constructor(key: string, toDefinition: (entity: T) => ILooseObject, isDisplay: boolean = false) {
        this.key = key;
        this.toDefinition = toDefinition;
        this.isDisplay = isDisplay;

        this.initColumnOptions();

        if (this.isDisplay) {
            this.options.editable = EditableOption.Readonly;
        }
    }

    public as(newName: string): ColumnData<T> {
        this.options.displayName = newName;

        return this;
    }

    public with(init?: { visible?: boolean; editable?: EditableOption; dataType?: ColumnDataType }): ColumnData<T> {
        if (init !== undefined) {
            if (init.editable !== undefined) {
                init.editable = EditableOption.Readonly;
            }

            ObjectUtil.copy(init, this.options);
        }

        return this;
    }

    private initColumnOptions(): void {
        this.options = { displayName: this.key, dataType: ColumnDataType.String, editable: EditableOption.Editable, visible: true };
    }
}

export interface IColumnSetup<T> {
    isDisplay?: boolean;
    options?: ColumnOptions;

    toDefinition: (entity: T) => ILooseObject;
}

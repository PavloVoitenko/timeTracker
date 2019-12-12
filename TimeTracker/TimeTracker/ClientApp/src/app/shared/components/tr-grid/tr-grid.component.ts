import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

import { ILooseObject } from '../../util/loose-object';

import { Datasource } from './util/datasource';

/**
 * Grid component
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tr-grid',
  styleUrls: ['./tr-grid.component.styl'],
  templateUrl: './tr-grid.component.html',
})
export class GridComponent {
  public constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  @Input() public dataSource: Datasource<object>;

  public isRowEditable(row: ILooseObject): boolean {
    return false; // this.editableRow.isSameRow(row);
  }
}

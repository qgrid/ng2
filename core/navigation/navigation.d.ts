import {ColumnModel} from '../column-type/column.model';
import {Cell} from '../cell/cell';

export interface IPositionResult {
  row: number;
  offset: number;
}

export declare type ReturnColumnOrNumber = ColumnModel | number;

export declare class Navigation {
  constructor();

  readonly currentColumn: ReturnColumnOrNumber;
  readonly nextColumn: ReturnColumnOrNumber;
  readonly prevColumn: ReturnColumnOrNumber;
  readonly lastColumn: ReturnColumnOrNumber;
  readonly firstColumn: ReturnColumnOrNumber;
  readonly currentRow: any;
  readonly nextRow: any;
  readonly prevRow: any;
  readonly firstRow: any;
  readonly lastRow: any;

  position(y: number, direction: string): IPositionResult;

  goTo(row: any, column: ColumnModel, source: string): void;

  cell(row: any, column: ColumnModel): Cell;
}

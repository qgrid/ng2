import { ColumnModel, ColumnModelPin } from '../../column-type/column.model';
import { GridPlugin } from '../../plugin/grid.plugin';
import { ColumnView } from '../view/column.view';
import { RenderStrategy } from './render.strategy';

export interface RowPosition {
  left: any[];
  mid: any[];
  right: any[];
  [key: string]: any[];
}

export declare class Renderer {
  defaultStrategy: RenderStrategy;
  readonly rows: RowPosition;

  constructor(plugin: GridPlugin);

  columns(row: any, pin: ColumnModelPin, rowIndex: number): ColumnView[];
  rowspan(row: any, column: ColumnView, rowIndex: number, columnIndex: number): number;
  colspan(row: any, column: ColumnView, rowIndex: number, columnIndex: number): number;

  getValue(row: any, column: ColumnModel, rowIndex: number, columnIndex: number): any;
  setValue(row: any, column: ColumnModel, value: any, rowIndex: number, columnIndex: number): void;

  getLabel(row: any, column: ColumnModel, rowIndex: number, columnIndex: number): any;
  setLabel(row: any, column: ColumnModel, value: any, rowIndex: number, columnIndex: number): void;
}

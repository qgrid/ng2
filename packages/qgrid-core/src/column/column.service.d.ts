import { ColumnModel } from '../column-type/column.model';
import { Table } from '../dom/table';
import { Model } from '../model/model';
import { ColumnView } from '../scene/view/column.view';

export declare function mapColumns(columns: ColumnModel[]): { [key: string]: ColumnModel };
export declare function getCellValue(column: ColumnModel): string;
export declare function findColumn(columns: ColumnModel[], key: string): ColumnModel;
export declare function findIndex(columns: ColumnModel[], key: string): number;
export declare function findView(columns: ColumnModel[], key: string): ColumnModel[];
export declare function dataView(columns: ColumnModel[], model: Model): ColumnModel[];
export declare function lineView(columnRows: ColumnView[]): string;
export declare function widthFactory(table: Table, form: Map<string, any>): number;

export declare function flattenColumns(columns: ColumnModel[]): ColumnModel[];
export declare function findLine(columns: ColumnModel[], key: string): { columns: ColumnModel[]; index: number } | null;

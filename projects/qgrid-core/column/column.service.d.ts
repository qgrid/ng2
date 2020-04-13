import { ColumnModel } from '../column-type/column.model';
import { ColumnView } from '../scene/view/column.view';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';

export declare function map(columns: ColumnModel[]): { [key: string]: ColumnModel };
export declare function getValue(column: ColumnModel): string;
export declare function find(columns: ColumnModel[], key: string): ColumnModel;
export declare function findIndex(columns: ColumnModel[], key: string): number;
export declare function findView(columns: ColumnModel[], key: string): ColumnModel[];
export declare function dataView(columns: ColumnModel[], model: Model): ColumnModel[];
export declare function lineView(columnRows: ColumnView[]): string;
export declare function widthFactory(table: Table, form: Map<string, any>): number;

export declare function flatten(columns: ColumnModel[]): ColumnModel[];
export declare function findLine(columns: ColumnModel[], key: string): { columns: ColumnModel[], index: number } | null;

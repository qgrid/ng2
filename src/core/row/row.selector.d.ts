import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';

export declare class RowSelector {
    constructor(model: Model);

    model: Model;
    source: string[];

    map(items: any[]): void;

    mapFromRows(rows: any[]): (rows: any[], columns: ColumnModel[]) => any;

    mapFromColumns(columns: ColumnModel[]): (rows: any[], columns: ColumnModel[]) => any;

    mapFromCells(items: any[]): any[];

    mapFromMix(items: any[]): (items: any[]) => any[];
}
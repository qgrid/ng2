import {Model} from 'ng2-qgrid/core/infrastructure/model';
import {ColumnModel} from 'ng2-qgrid/core/column-type/column.model';

export declare class RowSelector {
	constructor(model: Model);

	model: Model;
	source: 'body' | 'head' | 'foot';

	map(items: any[]): void;
	mapFromRows(rows: any[]): (rows: any[], columns: any[]) => any;
	mapFromColumns(columns: any[]): (rows: any[], columns: any[]) => any;
	mapFromCells(items: any[]): any[];
	mapFromMix(items: any[]): (items: any[]) => any[];
	value(column: ColumnModel): any;
}

import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Command } from 'ng2-qgrid/core/command/command';
import { RowModel } from 'ng2-qgrid/core/row/row.model';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';

export declare class ExportView {
	constructor(model: Model, context: { type: string });

	model: { [ key: string ]: any };
	type: string;
	csv: Command;
	json: Command;
	pdf: Command;
	xlsx: Command;
	xml: Command;
	readonly id: string;
	readonly rows: RowModel[];
	readonly columns: ColumnModel[];
}

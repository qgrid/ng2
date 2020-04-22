import { Model } from '@qgrid/core/infrastructure/model';
import { Command } from '@qgrid/core/command/command';
import { RowModel } from '@qgrid/core/row/row.model';
import { ColumnModel } from '@qgrid/core/column-type/column.model';

export declare class ExportPlugin {
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

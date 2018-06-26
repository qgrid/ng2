import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Command } from 'ng2-qgrid/core/command/command';
import { Row } from 'ng2-qgrid/core/dom/row';
import { Column } from 'ng2-qgrid/core/dom/column';

export declare class ExportView {
	constructor(model: Model, context: { type: string });

	model: {
		[ key: string ]: any
	};
	type: string;
	csv: Command;
	json: Command;
	pdf: Command;
	xlsx: Command;
	xml: Command;
	readonly id: string;
	readonly rows: Row[];
	readonly columns: Column[];
}

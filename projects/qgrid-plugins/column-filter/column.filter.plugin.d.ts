import { Model } from '@qgrid/core/infrastructure/model';
import { Event } from '@qgrid/core/infrastructure/event';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { Command } from '@qgrid/core/command/command';
import { Expression } from '@qgrid/core/expression/expression.build';

export declare class ColumnFilterPlugin {
	constructor(model: Model, context: { key: string });

	by: Set<string>;
	expression: Expression;
	cancelEvent: Event;
	submitEvent: Event;
	getValue: (row: any) => any;
	column: ColumnModel;
	value: any;
	items: Array<any>;
	changeOperator: Command;
	reset: Command;
	commit: Command;
	cancel: Command;
	hasBlanks: boolean;
	isEmpty(): boolean;
}

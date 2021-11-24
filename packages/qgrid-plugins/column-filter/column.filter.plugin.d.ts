import { Event } from '@qgrid/core/event/event';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { Command } from '@qgrid/core/command/command';
import { Expression } from '@qgrid/core/expression/expression.build';
import { GridPlugin } from '@qgrid/core/plugin/grid.plugin';

export declare class ColumnFilterPlugin {
	constructor(plugin: GridPlugin, context: { column: ColumnModel });

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

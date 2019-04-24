import { Model } from '../../core/infrastructure/model';
import { Event } from '../../core/infrastructure/event';
import { ColumnModel } from '../../core/column-type/column.model';
import { Command } from '../../core/command/command';
import { Expression } from '../../core/expression/expression.build';

export declare class ColumnFilterView {
	constructor(model: Model, context: { key: string });

	by: Set<string>;
	expression: Expression;
	cancelEvent: Event;
	submitEvent: Event;
	getValue: (row: any) => any;
	column: ColumnModel;
	value: string | Date | number | Array<any>;
	items: Array<any>;
	reset: Command;
	commit: Command;
	cancel: Command;
	hasBlanks: boolean;
	isEmpty(): boolean;
}

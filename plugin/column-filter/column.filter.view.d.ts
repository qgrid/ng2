import { PluginView } from '../plugin.view';
import { Model } from '../../core/infrastructure/model';
import { Event } from '../../core/infrastructure/event';
import { ColumnModel } from '../../core/column-list/column.list.model';
import { Command } from '../../core/command/command';

export declare class ColumnFilterView extends PluginView {
	constructor(model: Model, context: any);
	cancelEvent: Event;
	submitEvent: Event;
	getValue: (row: any) => any;
	column: ColumnModel;
	items: Array<any>;
	reset: Command;
	commit: Command;
	cancel: Command;
	hasBlanks: bool;
	filter: string;
}

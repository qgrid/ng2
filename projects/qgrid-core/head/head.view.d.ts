import { Command } from '../command/command';
import { ColumnView } from '../scene/view/column.view';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class HeadView {
	constructor(plugin: GridPlugin, tagName: string);

	drop: Command<{ dragData: string }>;
	drag: Command<{ dragData: string }>;

	resize: Command;

	rows: ColumnView[][];
	columns(row: any, pin: string);
}

import { Command } from '../command/command';
import { ColumnView } from '../scene/view/column.view';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class HeadView {
	constructor(plugin: GridPlugin, tagName: string);

	readonly drop: Command<{ dragData: string }>;
	readonly drag: Command<{ dragData: string }>;

	readonly resize: Command;

	readonly rows: ColumnView[][];

	columns(row: any, pin: string): ColumnView[];
}

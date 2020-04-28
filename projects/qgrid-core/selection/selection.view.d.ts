import { SelectionModel } from './selection.model';
import { ColumnModel } from '../column-type/column.model';
import { Command } from '../command/command';
import { Td } from '../dom/td';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class SelectionView {
	constructor(plugin: GridPlugin, shortcut: { register: (commands: Command[]) => void });

	readonly selection: SelectionModel;
	readonly rows: any[];
	readonly columns: ColumnModel[];

	readonly toggleRow: Command;
	readonly toggleCell: Command;
	readonly toggleColumn: Command;

	selectRange(startCell: Td, endCell: Td, source?: string): void;
	state(item: any): boolean;
	isIndeterminate(item: any): boolean;
}

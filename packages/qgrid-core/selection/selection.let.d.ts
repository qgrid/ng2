import { ColumnModel } from '../column-type/column.model';
import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';
import { SelectionState } from './selection.state';
import { SubjectLike } from '../rx/rx';
import { Td } from '../dom/td';

export declare class SelectionLet {
	constructor(plugin: GridPlugin, shortcut: { register: (commands: Command[]) => void });

	readonly selection: SelectionState;
	readonly rows: any[];
	readonly columns: ColumnModel[];

	readonly toggleRow: Command;
	readonly toggleCell: Command;
	readonly toggleColumn: Command;

	selectRange(startCell: Td, endCell: Td, source?: string): void;

	state(item: any): boolean;
	isIndeterminate(item: any): boolean;
	stateCheck: SubjectLike<boolean>;
}

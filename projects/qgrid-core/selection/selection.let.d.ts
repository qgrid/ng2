import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';
import { SubjectLike } from '../rx/rx';
import { SelectionStateMode } from './selection.state';

export declare class SelectionLet {
	constructor(plugin: GridPlugin);

	readonly toggleRow: Command<any>;
	readonly stateCheck: SubjectLike<boolean>;
	readonly mode: SelectionStateMode;

	state(item: any): boolean;
	isIndeterminate(item: any): boolean;
}

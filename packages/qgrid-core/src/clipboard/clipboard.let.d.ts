import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class ClipboardLet {
	readonly copy: Command;

	constructor(
		plugin: GridPlugin,
		shortcut: { register: (commands: Command[]) => void }
	);
}

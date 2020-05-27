import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class ClipboardLet {
	constructor(
		plugin: GridPlugin,
		shortcut: { register: (commands: Command[]) => void }
	);

	readonly copy: Command;
}

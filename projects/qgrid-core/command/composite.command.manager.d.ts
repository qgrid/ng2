import { Command } from './command';
import { CommandManager } from './command.manager';

export declare class CompositeCommandManager {
	constructor(manager: CommandManager);

	filter(commands: Command[]): Command[];
	invoke(commands: Command[], context?: any, source?: string): boolean;
}

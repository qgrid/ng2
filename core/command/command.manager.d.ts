import {Command} from './command';

export declare class CommandManager {
	constructor();

	invoke(commands: Command[], source?: string): boolean;

	filter(commands: Command[], source?: string): Command[];
}

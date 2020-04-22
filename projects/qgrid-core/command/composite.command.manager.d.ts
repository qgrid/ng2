import {Command} from './command';

export declare class CompositeCommandManager {
	constructor();

	filter(commands: Command[]): Command[];
	invoke(commands: Command[]): boolean;
}

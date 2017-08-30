import {Command} from '../command/command';

export declare class Action {
	constructor(command: Command, title?: string, icon?: string);

	command: Command;
	title: string;
	icon: string;
}
export interface IContext {
	execute?: () => void;
	canExecute?: () => boolean;
	shortcut?: string;
	priority?: number;
	source?: string;
}

export declare class Command {
	constructor(context?: IContext);

	canExecute: (...args: any[]) => boolean;
	execute: (...args: any[]) => any;
	shortcut?: string;
	priority?: number;
	source?: string; 
}

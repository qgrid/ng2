export interface IContext {
	execute?: () => void;
	canExecute?: () => boolean;
	shortcut?: string;
}

export declare class Command {
	constructor(context?: IContext);

	canExecute: (...args: any[]) => boolean;
	execute: (...args: any[]) => void;
	shortcut?: string;
}

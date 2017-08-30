export interface IContext {
	execute: () => void;
	canExecute: () => boolean;
}

export declare class Command {
	constructor(context?: IContext);

	canExecute: (...args: any[]) => boolean;
	execute: (...args: any[]) => void;
}

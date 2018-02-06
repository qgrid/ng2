export interface IContext {
	execute?: (...args: any[]) => any;
	canExecute?: (...args: any[]) => boolean;
	shortcut?: string;
	priority?: number;
	source?: string;
}

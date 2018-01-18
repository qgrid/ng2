export interface IContext {
	execute?: () => void;
	canExecute?: () => boolean;
	shortcut?: string;
	priority?: number;
	source?: string;
}

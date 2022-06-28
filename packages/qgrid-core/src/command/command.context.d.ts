export interface CommandContext<T = undefined> {
	execute: (e: T, ...args: any[]) => any;
	canExecute: (e: T, ...args: any[]) => boolean;
	shortcut: string;
	priority: number;
	source: string;
}

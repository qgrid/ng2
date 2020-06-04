import { CommandKey } from './command.key';

export interface CommandContext<T = any> {
	readonly key: CommandKey<T>;
	readonly execute: (e?: T) => boolean | void;
	readonly canExecute: (e?: T) => boolean;
	readonly shortcut: string;
	readonly priority: number;
	readonly stopPropagate: boolean;
}

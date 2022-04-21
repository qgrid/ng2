export class CommandKey<T> {
	name: string;
	type?: T;
}

export function commandKey<T>(name: string): CommandKey<T>;

export function generateCommandKey(): CommandKey<any>;

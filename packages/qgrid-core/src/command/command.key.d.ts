export class CommandKey<T> {
	name: string;
}

export function commandKey<T>(name: string): CommandKey<T>

export function generateCommandKey(): CommandKey<any>

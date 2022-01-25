export interface Storage {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
}

export declare class PersistenceStorage {
	constructor(storage: Storage);

	getItem<T>(key: string): Promise<T>;
	setItem<T>(key: string, value: T): Promise<any>;
}

export function serialize<T>(value: T): string;
export function deserialize<T>(value: string): T;

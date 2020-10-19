export interface Storage {
	getItem(key: string): string;
	setItem(key: string, value: string): void;
}

export declare class PersistenceStorage {
	constructor(storage: Storage);

	getItem<T>(key: string): Promise<T>;
	setItem<T>(key: string, value: T): Promise<any>;
}

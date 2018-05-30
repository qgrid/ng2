export interface IStorage {
	getItem(key: string): string;
	setItem(key: string, value: string): void;
}

export declare class PersistenceStorage {
	constructor(storage: IStorage);

	getItem(key: string): Promise<object>;
	setItem(key: string, value: any): Promise<object>;
}

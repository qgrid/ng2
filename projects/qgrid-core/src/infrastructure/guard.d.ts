export declare class Guard {
	static notUndefined(value: any, name: string): void;
	static notNull(value: any, name: string): void;
	static notNullOrEmpty(value: any, name: string): void;
	static invokable(value: any, name: string): void;
	static hasProperty(instance: any, key: any): void;
}

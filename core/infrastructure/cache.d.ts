export declare class Cache <K, V> {
	constructor();

	set(key: K, value: V);
	get(key: K): V ;
	has(key: K): boolean;
	find(key: K): V;
	remove(key: K): void;
	clear(): void;
}

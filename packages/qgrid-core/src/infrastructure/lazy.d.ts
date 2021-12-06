export declare class Lazy<T> {
	constructor(build: () => T);

	get instance(): T;
}

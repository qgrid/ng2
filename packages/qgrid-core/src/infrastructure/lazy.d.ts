export declare class Lazy<T> {

	get instance(): T;

	constructor(build: () => T);
}

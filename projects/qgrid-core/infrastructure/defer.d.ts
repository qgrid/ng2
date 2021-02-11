export declare class DeferPromise<T> {
	catch(handler: () => void): DeferPromise<T>;
	then(handler: (value: T) => void): DeferPromise<T>;
}

export declare class Defer<T> {
	promise: DeferPromise<T>;
	reject(): void;
	resolve(value: T): void;
}


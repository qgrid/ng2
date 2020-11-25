export declare class DeferPromise {
	catch(handler: () => void): DeferPromise;
	then(handler: () => void): DeferPromise;
}

export declare class Defer {
	promise: DeferPromise;
	reject(): void;
	resolve(): void;
}


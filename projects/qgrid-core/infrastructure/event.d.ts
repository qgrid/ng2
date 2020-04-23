
export declare class Event<T = any> {
	constructor(e?: () => any);

	on(handler: (arg: T, off?: () => void) => void): () => void;
	watch(handler: (e: T, off?: () => void) => void): () => void;
	emit(e: T): void;
}

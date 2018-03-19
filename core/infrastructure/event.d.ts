export declare class Event {
	constructor(e?: () => any);

	on(handler: (arg: any) => void): () => void;
	watch(handler: (e: any, off?: () => void) => void): () => void;
	emit(e: any): void;
}

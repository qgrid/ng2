export declare class Disposable {
	add<T extends { finalize: () => void }>(instance: T | (() => void)): T | (() => void);
	finalize(): void;
}
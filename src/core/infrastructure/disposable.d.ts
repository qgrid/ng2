export declare class Disposable {
	using<T extends Disposable>(instance: T | (() => void)): T | (() => void);
	dispose(): void;
}
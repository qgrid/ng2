export declare class Disposable {
	using<T extends Disposable>(instance: T | (() => void)): T | null;
	dispose(): void;
}
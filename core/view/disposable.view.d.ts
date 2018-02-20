export declare class DisposableView {
	constructor();

	using(dispose: () => void): () => void;

	dispose(): void;
}

export type DisposableResource =
	{ finalize: () => void }
	| { unsubscribe: () => void }
	| (() => void);

export declare interface Disposable {
	add(resource: DisposableResource);
	remove(resource: DisposableResource): boolean;
	finalize(): void;
}
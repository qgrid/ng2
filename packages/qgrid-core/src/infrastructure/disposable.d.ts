export type DisposableResource =
	{ finalize: () => void }
	| { unsubscribe: () => void }
	| (() => void);

export declare class Disposable {
  add(resource: DisposableResource): void;
  remove(resource: DisposableResource): boolean;
  finalize(): void;
}

export declare type EventUnsubscribe = () => void;
export declare type EventHandler<TArg> = (arg: TArg, off: EventUnsubscribe) => void;

export declare class Event<TArg = any> {
	constructor(reply?: () => TArg);

	emit(value: TArg): void;

	on(next: EventHandler<TArg>): EventUnsubscribe;
	watch(next: EventHandler<TArg>): EventUnsubscribe;
}

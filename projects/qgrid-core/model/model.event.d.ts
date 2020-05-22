import { Event } from '../event/event';

export declare interface ModelTag {
	source?: string;
	behavior?: string;
	isBusy?: boolean;
}

export declare type ModelChanges<TState> = { [key in keyof TState]: { newValue: TState[key] | null, oldValue: TState[key] | null } };

export declare interface ModelEventArg<TState> {
	state: TState;
	changes: ModelChanges<TState>;
	tag: ModelTag;

	hasChanges<TKey extends keyof TState>(key: TKey): boolean;
}

export declare type ModelEvent<T> = Event<ModelEventArg<T>>;

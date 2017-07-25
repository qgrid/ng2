import {IFunc} from '../dom/view';
import {EventManager} from '@grid/core/infrastructure/event.manager';

export interface IOnResult {
	(): void;
}

export declare class EventListener {
	constructor(context: object, element: EventManager);
	on(name: string, f: IFunc): IOnResult;
	off(): void;
}

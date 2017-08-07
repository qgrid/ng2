import {EventManager} from '@grid/core/infrastructure/event.manager';
import {IFunc} from '@grid/core/dom/view';

export interface IOnResult {
  (): void;
}

export declare class EventListener {
	constructor(element: HTMLElement, manager: EventManager);

	on(name: string, f: IFunc): IOnResult;
	off(): void;
}

import {EventManager} from 'ng2-qgrid/core/infrastructure/event.manager';
import {IFunc} from 'ng2-qgrid/core/dom/view';

export interface IOnResult {
  (): void;
}

export declare class EventListener {
	constructor(element: Element, manager: EventManager);

	on(name: string, f: IFunc): IOnResult;
	off(): void;
}

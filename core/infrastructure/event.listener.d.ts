import {EventManager} from './event.manager';
import {IFunc} from '../dom/view';

export interface IOnResult {
	(): void;
}

export declare class EventListener {
	constructor(element: Element, manager: EventManager);

	on(name: string, f: IFunc): IOnResult;

	off(): void;
}

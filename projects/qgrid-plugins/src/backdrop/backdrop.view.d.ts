import { Event } from '../../core/infrastructure/event';

export declare class BackdropView {
	constructor(context: { element: HTMLElement, propagate: boolean, onKeyDown: (e: any) => void });

	closeEvent: Event;
}

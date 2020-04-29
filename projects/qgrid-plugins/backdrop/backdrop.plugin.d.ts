import { Event } from '@qgrid/core/event/event';

export declare class BackdropPlugin {
	constructor(context: {
		element: HTMLElement,
		propagate: boolean,
		onKeyDown: (e: any) => void
	});

	closeEvent: Event;
}

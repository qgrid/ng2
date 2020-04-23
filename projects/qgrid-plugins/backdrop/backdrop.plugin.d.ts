import { Event } from '@qgrid/core/infrastructure/event';

export declare class BackdropPlugin {
	constructor(context: {
		element: HTMLElement,
		propagate: boolean,
		onKeyDown: (e: any) => void
	});

	closeEvent: Event;
}

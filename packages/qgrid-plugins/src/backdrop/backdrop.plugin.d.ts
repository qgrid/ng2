import { Event } from '@qgrid/core';

export declare class BackdropPlugin {
	constructor(context: {
		element: HTMLElement,
		propagate: boolean,
		onKeyDown: (e: any) => void
	});

	closeEvent: Event;
}

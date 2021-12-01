import { CellEditor, Event, GridPlugin } from '@qgrid/core';

export declare class EditFormPanelPlugin {
	constructor(
		plugin: GridPlugin,
		context: { row: any, caption: string },
	);

	editors: CellEditor[];
	submitEvent: Event;
	cancelEvent: Event;
	resetEvent: Event;
}

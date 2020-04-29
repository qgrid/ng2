import { Event } from '@qgrid/core/event/event';
import { CellEditor } from '@qgrid/core/edit/edit.cell.editor';
import { GridPlugin } from '@qgrid/core/plugin/grid.plugin';

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

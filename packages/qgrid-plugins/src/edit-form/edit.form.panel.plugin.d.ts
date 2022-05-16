import { CellEditor, Event, GridPlugin } from '@qgrid/core';

export declare class EditFormPanelPlugin {
  editors: CellEditor[];
  submitEvent: Event;
  cancelEvent: Event;
  resetEvent: Event;

  constructor(
		plugin: GridPlugin,
		context: { row: any; caption: string },
	);
}

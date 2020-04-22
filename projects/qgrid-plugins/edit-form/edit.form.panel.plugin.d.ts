import { Event } from '@qgrid/core/infrastructure/event';
import { Disposable } from '@qgrid/core/infrastructure/disposable';
import { Model } from '@qgrid/core/infrastructure/model';
import { CellEditor } from '@qgrid/core/edit/edit.cell.editor';

export declare class EditFormPanelPlugin {
	constructor(
		model: Model,
		context: { row: any, caption: string },
		disposable: Disposable
	);

	editors: CellEditor[];
	submitEvent: Event;
	cancelEvent: Event;
	resetEvent: Event;
}

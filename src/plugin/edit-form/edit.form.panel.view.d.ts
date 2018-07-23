import { Event } from '../../core/infrastructure/event';
import { Disposable } from '../../core/infrastructure/disposable';
import { Model } from '../../core/infrastructure/model';
import { CellEditor } from '../../core/edit/edit.cell.editor';

export declare class EditFormPanelView extends Disposable {
	constructor(model: Model, context: { row: any, caption: string });

	editors: CellEditor[];
	submitEvent: Event;
	cancelEvent: Event;
	resetEvent: Event;
}

import { Event } from '@qgrid/core/infrastructure/event';
import { Model } from '@qgrid/core/infrastructure/model';

export declare class CellEditorPlugin {
	constructor(model: Model);
	closeEvent: Event;
}

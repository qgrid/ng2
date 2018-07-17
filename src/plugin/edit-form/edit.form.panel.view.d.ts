import { Disposable } from '../../core/infrastructure/disposable';
import { Model } from '../../core/infrastructure/model';
import { CellEditor } from '../../core/edit/edit.cell.editor';

export declare class EditFormPanelView extends Disposable {
	constructor(model: Model, context: { row: any });

	editors: CellEditor[];
}

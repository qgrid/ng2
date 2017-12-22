import { PluginView } from '../plugin.view';
import { Event } from '../../core/infrastructure/event';
import { Model } from '../../core/infrastructure/model';

export declare class CellEditorView extends PluginView {
	constructor(model: Model);
	closeEvent: Event;
}

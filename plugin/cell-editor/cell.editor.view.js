import {PluginView} from '../plugin.view';
import {Event} from '../../core/infrastructure';

export class CellEditorView extends PluginView {
	constructor(model) {
		super(...arguments);
		
		this.closeEvent = new Event();
		this.using(model.sceneChanged.on(() => this.close()));
	}

	close() {
		this.closeEvent.emit();
	}
}

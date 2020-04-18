import { Event } from '@qgrid/core/infrastructure';

export class CellEditorPlugin {
	constructor() {
		this.closeEvent = new Event();
		model.sceneChanged.on(() => this.close());
	}

	close() {
		this.closeEvent.emit();
	}
}

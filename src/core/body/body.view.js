import { Log } from '../infrastructure/log';
import { Renderer } from '../scene/render/render';

export class BodyView {
	constructor(model, table) {
		this.model = model;
		this.table = table;
		this.rows = [];

		const render = new Renderer(model);

		this.render = render;
		this.columns = pin => render.defaultStrategy.columnList(pin);

		let wasInvalidated = false;
		model.sceneChanged.watch(e => {
			if (e.hasChanges('rows')) {
				this.invalidate();
				wasInvalidated = true;
			}
		});

		model.rowChanged.watch(e => {
			if (e.hasChanges('pinTop') || e.hasChanges('pinBottom')) {
				this.invalidate();
				wasInvalidated = true;
			}
		});

		if (!wasInvalidated) {
			this.invalidate();
		}
	}

	invalidate() {
		Log.info('view.body', 'invalidate');

		const model = this.model;
		const table = this.table;
		const { rows } = model.scene();

		if (!(rows.length || model.data().rows.length)) {
			if (!table.view.hasLayer('blank')) {
				table.view.addLayer('blank');
			}
		} else {
			if (table.view.hasLayer('blank')) {
				table.view.removeLayer('blank');
			}
		}
	}
}

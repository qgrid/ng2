import { Log } from '../infrastructure/log';
import { Renderer } from '../scene/render/render';

export class BodyView {
	constructor(model, table) {
		this.model = model;
		this.table = table;
		this.rows = [];

		const render = new Renderer(model);

		this.render = render;
		this.columns = (row, pin, rowIndex) => render.defaultStrategy.columns(row, pin, rowIndex);

		let wasInvalidated = false;
		model.sceneChanged.watch(e => {
			if (e.hasChanges('rows')) {
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

		this.rows = rows;

		table.view.removeLayer('blank');
		if (!rows.length && !model.data().rows.length) {
			table.view.addLayer('blank');
		}
	}
}
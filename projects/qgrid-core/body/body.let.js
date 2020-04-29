import { Log } from '../infrastructure/log';
import { Renderer } from '../scene/render/render';

export class BodyLet {
	constructor(plugin) {
		const { model, observe } = plugin;
		const render = new Renderer(model);

		this.plugin = plugin;
		this.render = render;
		this.columns = pin => render.defaultStrategy.columnList(pin);

		observe(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('rows')) {
					this.invalidate();
				}
			});

		observe(model.rowChanged)
			.subscribe(e => {
				if (e.hasChanges('pinTop') || e.hasChanges('pinBottom')) {
					this.invalidate();
				}
			});

		this.invalidate();
	}

	invalidate() {
		Log.info('view.body', 'invalidate');

		const { model, table } = this.plugin;
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

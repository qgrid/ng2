import { Log } from '../infrastructure/log';
import { TextSelection } from '../services/text.selection';
import { Renderer } from '../scene/render/render';

export class BodyLet {
	constructor(plugin) {
		const { model, observe, disposable } = plugin;
		const render = new Renderer(plugin);

		this.plugin = plugin;
		this.render = render;
		this.columns = pin => render.defaultStrategy.columnList(pin);

		observe(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('rows')) {
					this.tryShowBlankLayer();
				}
			});

		observe(model.mouseChanged)
			.subscribe(({ state }) => {
				const { code, status, target } = state;
				if (this.selectedNode && status === 'down') {
					TextSelection.clear(this.selectedNode);
				}
				if (target && code === 'right' && status === 'up') {
					this.selectedNode = target.element;
					TextSelection.set(this.selectedNode);
				}
			});

		this.tryShowBlankLayer();
	}

	tryShowBlankLayer() {
		Log.info('view.let', 'invalidate');

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

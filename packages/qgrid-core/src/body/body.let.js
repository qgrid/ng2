import { Log } from '../infrastructure/log';
import { Renderer } from '../scene/render/render';
import { TextSelection } from '../services/text.selection';

export class BodyLet {
	constructor(plugin) {
		const { model, observe } = plugin;
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
				
				if (target && code === 'right' && status === 'up') {
					this.targetElement = target.element;
					this.targetElement.classList.add('q-grid-can-select-text');
					TextSelection.set(this.targetElement);
				}

				if (this.targetElement && status === 'down') {
					TextSelection.clear();
					if (this.targetElement.classList) {
						this.targetElement.classList.remove('q-grid-can-select-text');
					}
          
					this.targetElement = null;
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

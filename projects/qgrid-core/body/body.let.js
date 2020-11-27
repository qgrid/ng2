import { EventListener } from '../event/event.listener';
import { EventManager } from '../event/event.manager';
import { Log } from '../infrastructure/log';
import { TextSelection } from '../infrastructure/text.selection';
import { Renderer } from '../scene/render/render';

export class BodyLet {
	constructor(plugin) {
		const { model, observe, disposable } = plugin;
		const render = new Renderer(plugin);

		this.plugin = plugin;
		this.render = render;
		this.columns = pin => render.defaultStrategy.columnList(pin);
		this.selectedNodes = [];

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
					TextSelection.set(target.element);
					this.selectedNodes.push(target.element);
				}
			});

		const manager = new EventManager(this);
		disposable.add(new EventListener(document, manager).on('click', this.removeSelections));
		disposable.add(new EventListener(window, manager).on('blur', this.removeSelections));

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

	removeSelections() {
		this.selectedNodes.forEach(TextSelection.clear);
		this.selectedNodes = [];
	}
}

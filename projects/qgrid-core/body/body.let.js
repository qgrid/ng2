import { TextSelection } from '../services/text.selection';
import { Renderer } from '../scene/render/render';
import { LAYER_BLANK_CHECK_COMMAND_KEY } from '../command-bag/command.bag';

export class BodyLet {
	constructor(plugin) {
		const { model, observe, commandPalette } = plugin;
		const render = new Renderer(plugin);

		this.plugin = plugin;
		this.render = render;
		this.columns = pin => render.defaultStrategy.columnList(pin);

		const layerBlankCheck = commandPalette.get(LAYER_BLANK_CHECK_COMMAND_KEY);
		observe(model.dataChanged)
			.subscribe(e => {
				if (e.hasChanges('rows')) {
					layerBlankCheck.execute();
				}
			});

		layerBlankCheck.execute();

		// TODO: refactor to command
		this.targetElement = null;
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
	}
}

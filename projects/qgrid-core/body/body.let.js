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
	}
}

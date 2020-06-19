import {
	ROW_DRAG_COMMAND_KEY,
	ROW_RESIZE_COMMAND_KEY,
	ROW_DROP_COMMAND_KEY
} from '../command-bag/command.bag';

export class RowLet {
	constructor(plugin, tagName) {
		const { model, commandPalette, observe } = plugin;

		this.plugin = plugin;
		this.tagName = tagName;

		this.drop = commandPalette.get(ROW_DROP_COMMAND_KEY);
		this.drag = commandPalette.get(ROW_DRAG_COMMAND_KEY);
		this.resize = commandPalette.get(ROW_RESIZE_COMMAND_KEY);

		observe(model.dataChanged)
			.subscribe(e => {
				if (e.hasChanges('rows')) {
					model.rowList({
						index: new Map(),
					}, {
						source: 'row.let',
						behavior: 'core'
					});
				}
			})
	}

	get canMove() {
		const { model } = this.plugin;
		return model.row().canMove;
	}
}
import { Command } from '../command/command';
import { RowDragCommand } from '../command-bag/row.drag.command';
import { CommandPalette } from '../command/command.palette';
import { RowDropCommand } from '../command-bag/row.drop.command';
import { RowResizeCommand } from '../command-bag/row.resize.command';

export class RowLet {
	constructor(plugin, tagName) {
		const { model, table, observe } = plugin;

		this.plugin = plugin;
		this.tagName = tagName;

		this.drop = new RowDropCommand(plugin);
		this.drag = new RowDragCommand(plugin);
		this.resize = new RowResizeCommand(plugin);

		CommandPalette.register(this.drag);
		CommandPalette.register(this.drop);
		CommandPalette.register(this.resize);

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
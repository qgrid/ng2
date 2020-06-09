import { ColumnDragCommand } from '../command-bag/column.drag.command';
import { ColumnDropCommand } from '../command-bag/column.drop.command';
import { ColumnResizeCommand } from '../command-bag/column.resize.command';
import { FilterRowColumn } from '../column-type/filter.row.column';
import { GRID_PREFIX } from '../definition';
import * as columnService from '../column/column.service';

export class HeadLet {
	constructor(plugin, tagName) {
		const { model, observeReply, commandPalette } = plugin;

		this.plugin = plugin;
		this.tagName = tagName;
		this.rows = [];

		this.drop = new ColumnDropCommand(plugin);
		this.drag = new ColumnDragCommand(plugin);
		this.resize = new ColumnResizeCommand(plugin);

		commandPalette.register(this.drop);
		commandPalette.register(this.drag);
		commandPalette.register(this.resize);

		observeReply(model.dataChanged)
			.subscribe(e => {
				if (e.hasChanges('columns')) {
					const line = columnService.flatten(e.state.columns);
					model.columnList({
						line
					}, {
						source: 'head.let'
					});
				}
			});

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('column')) {
					this.invalidate();
				}
			});

		observeReply(model.filterChanged)
			.subscribe(e => {
				if (e.hasChanges('unit')) {
					this.invalidate();
				}
			});
	}

	columns(row, pin) {
		return row.filter(c => c.model.pin === pin);
	}

	invalidate() {
		const { model, table } = this.plugin;
		this.rows = Array.from(model.scene().column.rows);

		if (this.rows.length > 1) {
			table.view.addClass(`${GRID_PREFIX}-head-span`);
		} else {
			table.view.removeClass(`${GRID_PREFIX}-head-span`);
		}

		if (model.filter().unit === 'row') {
			const filterRow = table.data.columns().map(c => new FilterRowColumn(c));
			this.rows.push(filterRow);
		}
	}
}

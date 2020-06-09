import { CellSelector } from '../cell/cell.selector';
import { Fastdom } from '../services/fastdom';
import { find, findLeaves } from '../node/node.service';
import { GRID_PREFIX } from '../definition';
import { HighlightCellCommand } from '../command-bag/highlight.cell.command';
import { HighlightClearCommand } from '../command-bag/highlight.clear.command';
import { HighlightColumnCommand } from '../command-bag/highlight.column.command';
import { HighlightRowCommand } from '../command-bag/highlight.row.command';
import { noop } from '../utility/kit';
import { SelectionService } from '../selection/selection.service';
import * as sortService from '../sort/sort.service';

export class HighlightLet {
	constructor(plugin) {
		const { model, table, observeReply, observe, commandPalette } = plugin;
		this.plugin = plugin;

		this.cellSelector = new CellSelector(model, table);
		this.selectionService = new SelectionService(model);

		let sortBlurs = [];
		let columnHoverBlurs = [];
		let rowHoverBlurs = [];
		let selectionBlurs = [];
		let cellHoverBlurs = [];

		this.column = new HighlightColumnCommand(plugin);
		this.row = new HighlightRowCommand(plugin);
		this.cell = new HighlightCellCommand(plugin);
		this.clear = new HighlightClearCommand(plugin);

		commandPalette.register(this.row);
		commandPalette.register(this.column);
		commandPalette.register(this.cell);
		commandPalette.register(this.clear);

		observeReply(model.selectionChanged)
			.subscribe(e => {
				if (e.hasChanges('items')) {
					selectionBlurs = this.invalidateSelection(selectionBlurs);
				}
			});

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('status')) {
					if (e.state.status === 'stop') {
						columnHoverBlurs = this.invalidateColumnHover(columnHoverBlurs);
						rowHoverBlurs = this.invalidateRowHover(rowHoverBlurs);
						cellHoverBlurs = this.invalidateCellHover(cellHoverBlurs);
						sortBlurs = this.invalidateSortBy(sortBlurs);
						selectionBlurs = this.invalidateSelection(selectionBlurs);
					}
				}
			});

		observeReply(model.sortChanged)
			.subscribe(e => {
				if (!this.isRendering && e.hasChanges('by')) {
					sortBlurs = this.invalidateSortBy(sortBlurs);
				}
			});

		observeReply(model.highlightChanged)
			.subscribe(e => {
				if (!this.isRendering) {
					if (e.hasChanges('cell')) {
						cellHoverBlurs = this.invalidateCellHover(cellHoverBlurs);
					}

					if (e.hasChanges('columns')) {
						columnHoverBlurs = this.invalidateColumnHover(columnHoverBlurs);
					}

					if (e.hasChanges('rows')) {
						rowHoverBlurs = this.invalidateRowHover(rowHoverBlurs);
					}
				}
			});

		observe(model.dragChanged)
			.subscribe(e => {
				if (e.hasChanges('isActive')) {
					if (e.state.isActive) {
						this.clear.execute();

						columnHoverBlurs = this.invalidateColumnHover(columnHoverBlurs);
						rowHoverBlurs = this.invalidateRowHover(rowHoverBlurs);
						cellHoverBlurs = this.invalidateCellHover(cellHoverBlurs);
					}
				}
			})
	}

	get isRendering() {
		const { model } = this.plugin;
		return model.scene().status !== 'stop' || model.drag().isActive;
	}

	invalidateColumnHover(dispose) {
		dispose.forEach(f => f());

		const { model } = this.plugin;
		const { columns } = model.highlight();

		return columns
			.map(columnKey => this.highlightColumn(columnKey, 'highlighted'));
	}

	invalidateRowHover(dispose) {
		dispose.forEach(f => f());

		const { model } = this.plugin;
		const { rows } = model.highlight();

		return rows
			.map(row => this.highlightRow(row, 'highlighted'));
	}

	invalidateCellHover(dispose) {
		dispose.forEach(f => f());

		const { model, table } = this.plugin;
		const { cell } = model.highlight();

		dispose = [];
		if (cell) {
			const { body } = table;
			const { rowIndex, columnIndex } = cell;
			dispose.push(this.highlightCell(body.cell(rowIndex, columnIndex), 'highlighted'));
		}

		return dispose;
	}

	invalidateSortBy(dispose) {
		dispose.forEach(f => f());

		const { model } = this.plugin;
		const sortBy = model.sort().by;

		dispose = [];
		for (let entry of sortBy) {
			const key = sortService.key(entry);
			dispose.push(this.highlightColumn(key, 'sorted'));
		}

		return dispose;
	}

	invalidateSelection(dispose) {
		dispose.forEach(f => f());

		const { model } = this.plugin;
		const { items } = model.selection();

		const entries = this.selectionService.lookup(items);
		const cells = this.cellSelector.map(entries);

		return cells
			.map(cell => this.highlightCell(cell, 'selected'));
	}

	findColumnPosition(key) {
		const { model } = this.plugin;
		const { index } = model.columnList();

		const pos = find(index, node => node.key.model.key === key);
		if (pos) {
			return findLeaves(pos.node).map(leaf => leaf.key.columnIndex);
		}

		return [];
	}

	highlightColumn(key, cls) {
		const { table } = this.plugin;

		const position = this.findColumnPosition(key);
		if (!position.length) {
			return noop;
		}

		const { head, body, foot } = table;
		Fastdom.mutate(() => {
			const isLeaf = position.length === 1;
			for (let index of position) {
				if (isLeaf) {
					head.column(index).addClass(`${GRID_PREFIX}-${cls}`);
					head.column(index - 1).addClass(`${GRID_PREFIX}-${cls}-prev`);
					head.column(index + 1).addClass(`${GRID_PREFIX}-${cls}-next`);
				}

				const bodyColumn = body.column(index);
				const column = bodyColumn.model();
				if (column && column.canHighlight) {
					bodyColumn.addClass(`${GRID_PREFIX}-${cls}`);
					foot.column(index).addClass(`${GRID_PREFIX}-${cls}`);
				}
			}
		});

		return this.blurColumn(key, cls);
	}

	blurColumn(key, cls) {
		const { table } = this.plugin;

		const position = this.findColumnPosition(key);
		if (!position.length) {
			return noop;
		}

		const { head, body, foot } = table;
		return () => {
			Fastdom.mutate(() => {
				for (let index of position) {
					head.column(index).removeClass(`${GRID_PREFIX}-${cls}`);
					head.column(index - 1).removeClass(`${GRID_PREFIX}-${cls}-prev`);
					head.column(index + 1).removeClass(`${GRID_PREFIX}-${cls}-next`);
					body.column(index).removeClass(`${GRID_PREFIX}-${cls}`);
					foot.column(index).removeClass(`${GRID_PREFIX}-${cls}`);
				}
			});
		};
	}

	highlightRow(index, cls) {
		const { table } = this.plugin;

		if (index < 0) {
			return noop;
		}

		const { body } = table;
		Fastdom.mutate(() => body.row(index).addClass(`${GRID_PREFIX}-${cls}`));

		return this.blurRow(index, cls);
	}

	blurRow(index, cls) {
		const { table } = this.plugin;

		if (index < 0) {
			return noop;
		}

		const row = table.body.row(index);
		return () => Fastdom.mutate(() => row.removeClass(`${GRID_PREFIX}-${cls}`));
	}

	highlightCell(cell, cls) {
		Fastdom.mutate(() => {
			cell.addClass(`${GRID_PREFIX}-${cls}`);
		});

		return this.blurCell(cell, cls);
	}

	blurCell(cell, cls) {
		return () =>
			Fastdom.mutate(() => {
				cell.removeClass(`${GRID_PREFIX}-${cls}`);
			});
	}
}
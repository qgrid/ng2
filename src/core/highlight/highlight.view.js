import { Command } from '../command/command';
import * as columnService from '../column/column.service';
import * as sortService from '../sort/sort.service';
import { CellSelector } from '../cell/cell.selector';
import { SelectionService } from '../selection/selection.service';
import { noop } from '../utility/kit';
import { GRID_PREFIX } from '../definition';
import { Fastdom } from '../services/fastdom';

export class HighlightView {
	constructor(model, table) {
		this.model = model;
		this.table = table;

		this.cellSelector = new CellSelector(model, table);
		this.selectionService = new SelectionService(model);

		let sortBlurs = [];
		let columnHoverBlurs = [];
		let rowHoverBlurs = [];
		let selectionBlurs = [];
		let cellHoverBlurs = [];

		this.column = new Command({
			source: 'highlight.view',
			canExecute: () => !this.isRendering,
			execute: (column, state) => {
				const columns = Array.from(model.highlight().columns);
				const index = columns.indexOf(column.key);
				let hasChanges = false;
				if (state) {
					if (index < 0) {
						columns.push(column.key);
						hasChanges = true;
					}
				}
				else {
					if (index >= 0) {
						columns.splice(index, 1);
						hasChanges = true;
					}
				}

				if (hasChanges) {
					model.highlight({ columns }, {
						source: 'highlight.view',
					});
				}
			}
		});

		this.row = new Command({
			source: 'highlight.view',
			canExecute: () => !this.isRendering,
			execute: (row, state) => {
				const rows = Array.from(model.highlight().rows);
				const index = rows.indexOf(row);
				let hasChanges = false;
				if (state) {
					if (index < 0) {
						rows.push(row);
						hasChanges = true;
					}
				}
				else {
					if (index >= 0) {
						rows.splice(index, 1);
						hasChanges = true;
					}
				}

				if (hasChanges) {
					model.highlight({ rows }, {
						source: 'highlight.view'
					});
				}
			}
		});

		this.cell = new Command({
			source: 'highlight.view',
			canExecute: () => !this.isRendering,
			execute: (newCell, state) => {
				let { cell } = model.highlight();
				let hasChanges = true;
				if (newCell === cell) {
					hasChanges = false;
				}
				else if (newCell && cell) {
					hasChanges =
						newCell.rowIndex !== cell.rowIndex
						|| newCell.columnIndex !== cell.columnIndex;
				}

				if (hasChanges) {
					model.highlight({ cell: newCell }, {
						source: 'highlight.view'
					});
				}
			}
		});

		model.selectionChanged.watch(e => {
			if (e.hasChanges('items')) {
				selectionBlurs = this.invalidateSelection(selectionBlurs);
			}
		});

		model.sceneChanged.watch(e => {
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

		model.sortChanged.watch(e => {
			if (!this.isRendering && e.hasChanges('by')) {
				sortBlurs = this.invalidateSortBy(sortBlurs);
			}
		});

		model.highlightChanged.watch(e => {
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

		model.dragChanged.on(e => {
			if (e.hasChanges('isActive')) {
				if (e.state.isActive) {
					model.highlight({
						columns: [],
						rows: [],
						cell: null
					}, {
							source: 'highlight.view'
						});

					columnHoverBlurs = this.invalidateColumnHover(columnHoverBlurs);
					rowHoverBlurs = this.invalidateRowHover(rowHoverBlurs);
					cellHoverBlurs = this.invalidateCellHover(cellHoverBlurs);
				}
			}
		})
	}

	get isRendering() {
		return this.model.scene().status !== 'stop' || this.model.drag().isActive;
	}

	invalidateColumnHover(dispose) {
		dispose.forEach(f => f());
		dispose = [];
		const { columns } = this.model.highlight();
		for (let columnKey of columns) {
			dispose.push(this.highlightColumn(columnKey, 'highlighted'));
		}

		return dispose;
	}

	invalidateRowHover(dispose) {
		dispose.forEach(f => f());
		dispose = [];
		const { rows } = this.model.highlight();
		for (let row of rows) {
			dispose.push(this.highlightRow(row, 'highlighted'));
		}

		return dispose;
	}

	invalidateCellHover(dispose) {
		dispose.forEach(f => f());
		dispose = [];
		const { cell } = this.model.highlight();
		if (cell) {
			const { body } = this.table;
			const { rowIndex, columnIndex } = cell;
			dispose.push(this.highlightCell(body.cell(rowIndex, columnIndex), 'highlighted'));
		}
		return dispose;
	}

	invalidateSortBy(dispose) {
		dispose.forEach(f => f());
		dispose = [];

		const sortBy = this.model.sort().by;
		for (let entry of sortBy) {
			const key = sortService.key(entry);
			dispose.push(this.highlightColumn(key, 'sorted'));
		}

		return dispose;
	}

	invalidateSelection(dispose) {
		dispose.forEach(f => f());

		const selectionItems = this.model.selection().items;
		const entries = this.selectionService.lookup(selectionItems);
		const cells = this.cellSelector.map(entries);
		dispose = cells.map(cell => this.highlightCell(cell, 'selected'));
		return dispose;
	}

	columnIndex(key) {
		const columns = this.table.data.columns();
		const index = columnService.findIndex(columns, key);
		if (index >= 0) {
			// TODO: add pivot col support
			const column = columns[index];
			if (!column.canHighlight) {
				return -1;
			}
		}

		return index;
	}

	highlightColumn(key, cls) {
		const index = this.columnIndex(key);
		if (index < 0) {
			return noop;
		}

		const { head, body, foot } = this.table;
		Fastdom.mutate(() => {
			head.column(index).addClass(`${GRID_PREFIX}-${cls}`);
			head.column(index - 1).addClass(`${GRID_PREFIX}-${cls}-prev`);
			head.column(index + 1).addClass(`${GRID_PREFIX}-${cls}-next`);
			body.column(index).addClass(`${GRID_PREFIX}-${cls}`);
			foot.column(index).addClass(`${GRID_PREFIX}-${cls}`);
		});

		return this.blurColumn(key, cls);
	}

	blurColumn(key, cls) {
		const index = this.columnIndex(key);
		if (index < 0) {
			return noop;
		}

		const { head, body, foot } = this.table;
		return () => {
			Fastdom.mutate(() => {
				head.column(index).removeClass(`${GRID_PREFIX}-${cls}`);
				head.column(index - 1).removeClass(`${GRID_PREFIX}-${cls}-prev`);
				head.column(index + 1).removeClass(`${GRID_PREFIX}-${cls}-next`);
				body.column(index).removeClass(`${GRID_PREFIX}-${cls}`);
				foot.column(index).removeClass(`${GRID_PREFIX}-${cls}`);
			});
		};
	}

	highlightRow(index, cls) {
		if (index < 0) {
			return noop;
		}

		const { body } = this.table;
		Fastdom.mutate(() => body.row(index).addClass(`${GRID_PREFIX}-${cls}`));

		return this.blurRow(index, cls);
	}

	blurRow(index, cls) {
		const table = this.table;
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
		return () => Fastdom.mutate(() => cell.removeClass(`${GRID_PREFIX}-${cls}`));
	}
}
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

		model.selectionChanged.watch(e => {
			if (e.hasChanges('items')) {
				selectionBlurs = this.invalidateSelection(selectionBlurs);
			}
		});

		model.sceneChanged.watch(e => {
			if (e.hasChanges('status')) {
				const status = e.state.status;
				switch (status) {
					case 'stop':
						columnHoverBlurs = this.invalidateColumnHover(columnHoverBlurs);
						rowHoverBlurs = this.invalidateRowHover(rowHoverBlurs);
						sortBlurs = this.invalidateSortBy(sortBlurs);
						selectionBlurs = this.invalidateSelection(selectionBlurs);
						break;
				}
			}
		});

		model.sortChanged.watch(e => {
			if (!this.isRendering && e.hasChanges('by')) {
				sortBlurs = this.invalidateSortBy(sortBlurs);
			}
		});

		model.highlightChanged.watch(e => {
			if (!this.isRendering && e.tag.source !== 'highlight') {
				if (e.hasChanges('columns')) {
					columnHoverBlurs = this.invalidateColumnHover(columnHoverBlurs);
				}

				if (e.hasChanges('rows')) {
					rowHoverBlurs = this.invalidateRowHover(rowHoverBlurs);
				}
			}
		});

		model.scrollChanged.watch(() => {
			const highlight = model.highlight;
			if (highlight().rows.length) {
				highlight({ rows: [] }, {
					source: 'highlight.view',
				});
			}
		});
	}

	get isRendering() {
		return this.model.scene().status === 'start';
	}

	invalidateColumnHover(dispose) {
		dispose.forEach(f => f());
		dispose = [];
		const highlightColumns = this.model.highlight().columns;
		for (let columnKey of highlightColumns) {
			dispose.push(this.highlightColumn(columnKey, 'highlighted'));
		}

		return dispose;
	}

	invalidateRowHover(dispose) {
		dispose.forEach(f => f());
		dispose = [];
		const highlightRows = this.model.highlight().rows;
		for (let rowIndex of highlightRows) {
			dispose.push(this.highlightRow(rowIndex, 'highlighted'));
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
		const table = this.table;
		const index = this.columnIndex(key);
		if (index < 0) {
			return noop;
		}

		Fastdom.mutate(() => {
			const head = table.head;
			head.column(index).addClass(`${GRID_PREFIX}-${cls}`);
			head.column(index - 1).addClass(`${GRID_PREFIX}-${cls}-prev`);
			head.column(index + 1).addClass(`${GRID_PREFIX}-${cls}-next`);
			table.body.column(index).addClass(`${GRID_PREFIX}-${cls}`);
			table.foot.column(index).addClass(`${GRID_PREFIX}-${cls}`);
		});

		return this.blurColumn(key, cls);
	}

	blurColumn(key, cls) {
		const table = this.table;
		const index = this.columnIndex(key);
		if (index < 0) {
			return noop;
		}

		return () => {
			Fastdom.mutate(() => {
				const head = table.head;
				head.column(index).removeClass(`${GRID_PREFIX}-${cls}`);
				head.column(index - 1).removeClass(`${GRID_PREFIX}-${cls}-prev`);
				head.column(index + 1).removeClass(`${GRID_PREFIX}-${cls}-next`);
				table.body.column(index).removeClass(`${GRID_PREFIX}-${cls}`);
				table.foot.column(index).removeClass(`${GRID_PREFIX}-${cls}`);
			});
		};
	}

	highlightRow(index, cls) {
		const table = this.table;
		if (index < 0) {
			return noop;
		}

		Fastdom.mutate(() => {
			table.body.row(index).addClass(`${GRID_PREFIX}-${cls}`);
		});

		return this.blurRow(index, cls);
	}

	blurRow(index, cls) {
		const table = this.table;
		if (index < 0) {
			return noop;
		}

		return () =>
			Fastdom.mutate(() => {
				table.body.row(index).removeClass(`${GRID_PREFIX}-${cls}`);
			});
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
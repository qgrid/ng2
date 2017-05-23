import {View} from '../view';
import {Command} from '../infrastructure';
import * as columnService from '../column/column.service';
import * as sortService from '../sort/sort.service';
import {HighlightBehavior} from './behaviors';
import {cellSelector} from './cell.selector';
import {noop} from '../services/utility';
import {GRID_PREFIX} from '../definition';

export class HighlightView extends View {
	constructor(model, table, timeout) {
		super(model);

		this.timeout = timeout;
		this.behavior = new HighlightBehavior(model, cellSelector(model, table));
		this.table = table;

		// TODO: get rid of this variable, maybe using table class?
		let waitForLayout = false;

		let sortBlurs = [];
		let columnHoverBlurs = [];
		let rowHoverBlurs = [];

		this.column = new Command({
			canExecute: () => !model.drag().isActive,
			execute: (column, state) => {
				if (!waitForLayout) {
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
						model.highlight({
							columns: columns
						}, {
							source: 'highlight.view',
						});
					}
				}
			}
		});

		this.row = new Command({
			canExecute: () => !model.drag().isActive,
			execute: (row, state) => {
				if (!waitForLayout) {
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
						model.highlight({
							rows: rows
						}, {
							source: 'highlight.view',
						});
					}
				}
			}
		});

		model.selectionChanged.watch(e => {
			this.timeout(() => this.behavior.update(e.state.entries), 0);
		});

		model.viewChanged.watch(() => {
			waitForLayout = true;
			this.timeout(() => {
				columnHoverBlurs = this.invalidateColumnHover(columnHoverBlurs);
				rowHoverBlurs = this.invalidateRowHover(rowHoverBlurs);
				sortBlurs = this.invalidateSortBy(sortBlurs);
				waitForLayout = false;
				this.behavior.update(this.model.selection().entries);
			}, 100);
		});

		model.sortChanged.watch(e => {
			if (!waitForLayout && e.hasChanges('by')) {
				sortBlurs = this.invalidateSortBy(sortBlurs);
			}
		});

		model.highlightChanged.watch(e => {
			if (!waitForLayout && e.tag.source !== 'highlight') {
				if (e.hasChanges('columns')) {
					columnHoverBlurs = this.invalidateColumnHover(columnHoverBlurs);
				}

				if (e.hasChanges('rows')) {
					rowHoverBlurs = this.invalidateRowHover(rowHoverBlurs);
				}
			}
		});
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

		const head = table.head;
		head.column(index).addClass(`${GRID_PREFIX}-${cls}`);
		head.column(index - 1).addClass(`${GRID_PREFIX}-${cls}-prev`);
		head.column(index + 1).addClass(`${GRID_PREFIX}-${cls}-next`);
		table.body.column(index).addClass(`${GRID_PREFIX}-${cls}`);
		table.foot.column(index).addClass(`${GRID_PREFIX}-${cls}`);

		return this.blurColumn(key, cls);
	}

	blurColumn(key, cls) {
		const table = this.table;
		const index = this.columnIndex(key);
		if (index < 0) {
			return noop;
		}

		return () => {
			const head = table.head;
			head.column(index).removeClass(`${GRID_PREFIX}-${cls}`);
			head.column(index - 1).removeClass(`${GRID_PREFIX}-${cls}-prev`);
			head.column(index + 1).removeClass(`${GRID_PREFIX}-${cls}-next`);
			table.body.column(index).removeClass(`${GRID_PREFIX}-${cls}`);
			table.foot.column(index).removeClass(`${GRID_PREFIX}-${cls}`);
		};
	}

	highlightRow(index, cls) {
		const table = this.table;
		if (index < 0) {
			return noop;
		}

		table.body.row(index).addClass(`${GRID_PREFIX}-${cls}`);
		return this.blurRow(index, cls);
	}

	blurRow(index, cls) {
		const table = this.table;
		if (index < 0) {
			return noop;
		}

		return () => table.body.row(index).removeClass(`${GRID_PREFIX}-${cls}`);
	}
}
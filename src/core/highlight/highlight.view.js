import {View} from '../view';
import {Command} from '../infrastructure';
import * as columnService from '../column/column.service';
import * as sortService from '../sort/sort.service';
import {HighlightBehavior} from './behaviors';
import {cellSelector} from './cell.selector';
import {noop} from '../services/utility';
import {GRID_PREFIX} from '../definition';

export class HighlightView extends View {
	constructor(model, table, applyFactory) {
		super(model);

		this.apply = applyFactory('async');
		this.behavior = new HighlightBehavior(model, cellSelector(model, table));
		this.table = table;

		// TODO: get rid of this variable, maybe using table class?
		let waitForLayout = false;

		let sortBlurs = [];
		let hoverBlurs = [];

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
						},{
							source: 'highlight.view',
						});
					}
				}
			}
		});

		model.selectionChanged.watch(e => {
			this.apply(() => this.behavior.update(e.state.entries), 0);
		});

		model.viewChanged.watch(() => {
			waitForLayout = true;
			this.apply(() => {
				hoverBlurs = this.invalidateHover(hoverBlurs);
				sortBlurs = this.invalidateSortBy(sortBlurs);
				waitForLayout = false;
			}, 100);
		});

		model.sortChanged.watch(e => {
			if (!waitForLayout && e.hasChanges('by')) {
				sortBlurs = this.invalidateSortBy(sortBlurs);
			}
		});

		model.highlightChanged.watch(e => {
			if (!waitForLayout && e.tag.source !== 'highlight') {
				hoverBlurs = this.invalidateHover(hoverBlurs);
			}
		});
	}

	invalidateHover(dispose) {
		dispose.forEach(f => f());
		dispose = [];
		const highlightColumns = this.model.highlight().columns;
		for (let columnKey of highlightColumns) {
			dispose.push(this.highlight(columnKey, 'highlighted'));
		}

		return dispose;
	}

	invalidateSortBy(dispose) {
		dispose.forEach(f => f());
		dispose = [];

		const sortBy = this.model.sort().by;
		for (let entry of sortBy) {
			const key = sortService.key(entry);
			dispose.push(this.highlight(key, 'sorted'));
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

	highlight(key, cls) {
		const table = this.table;
		const index = this.columnIndex(key);
		if (index < 0) {
			return noop;
		}

		const head = table.head;
		const headCells = head.column(index).cells();
		headCells.forEach((cell) => cell.addClass(`${GRID_PREFIX}-${cls}`));
		const cellsPrev = head.column(index - 1).cells();
		cellsPrev.forEach((cell) => cell.addClass(`${GRID_PREFIX}-${cls}-prev`));
		const cellsNext = head.column(index + 1).cells();
		cellsNext.forEach((cell) => cell.addClass(`${GRID_PREFIX}-${cls}-next`));
		const bodyCells = table.body.column(index).cells();
		bodyCells.forEach((cell) => cell.addClass(`${GRID_PREFIX}-${cls}`));
		const footCells = table.foot.column(index).cells();
		footCells.forEach((cell) => cell.addClass(`${GRID_PREFIX}-${cls}`));

		return this.blur(key, cls);
	}

	blur(key, cls) {
		const table = this.table;
		const index = this.columnIndex(key);
		if (index < 0) {
			return noop;
		}

		return () => {
			const head = table.head;
			const headCells = head.column(index).cells();
			headCells.forEach((cell) => cell.removeClass(`${GRID_PREFIX}-${cls}`));
			const cellsPrev = head.column(index - 1).cells();
			cellsPrev.forEach((cell) => cell.removeClass(`${GRID_PREFIX}-${cls}-prev`));
			const cellsNext = head.column(index + 1).cells();
			cellsNext.forEach((cell) => cell.removeClass(`${GRID_PREFIX}-${cls}-next`));
			const bodyCells = table.body.column(index).cells();
			bodyCells.forEach((cell) => cell.removeClass(`${GRID_PREFIX}-${cls}`));
			const footCells = table.foot.column(index).cells();
			footCells.forEach((cell) => cell.removeClass(`${GRID_PREFIX}-${cls}`));
		};
	}
}
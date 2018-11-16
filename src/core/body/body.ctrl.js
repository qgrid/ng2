import { PathService } from '../path/path.service';
import { Fastdom } from '../services/fastdom';
import { GRID_PREFIX } from '../definition';
import { jobLine } from '../services/job.line';

const MOUSE_LEFT_BUTTON = 1;
const VERTICAL_SCROLL_CLASS = `${GRID_PREFIX}-scroll-vertical`;
const HORIZONTAL_SCROLL_CLASS = `${GRID_PREFIX}-scroll-horizontal`;

export class BodyCtrl {
	constructor(model, view, table, bag) {
		this.model = model;
		this.view = view;
		this.bag = bag;
		this.table = table;
		this.rangeStartCell = null;
		this.scrollingJob = jobLine(100);
	}

	onScroll(e) {
		const { scroll } = this.model;

		const oldValue = scroll();
		const newValue = {};
		let hasChanges = false;
		if (oldValue.top !== e.scrollTop) {
			this.table.view.addClass(VERTICAL_SCROLL_CLASS);
			newValue.top = e.scrollTop;
			hasChanges = true;
		}

		if (oldValue.left !== e.scrollLeft) {
			this.table.view.addClass(HORIZONTAL_SCROLL_CLASS);
			newValue.left = e.scrollLeft;
			hasChanges = true;
		}

		if (hasChanges) {
			scroll(newValue, {
				source: 'body.core',
				behavior: 'core'
			});
		}

		this.scrollingJob(this.onScrollEnd.bind(this));
	}

	onScrollEnd() {
		this.table.view.removeClass(VERTICAL_SCROLL_CLASS);
		this.table.view.removeClass(HORIZONTAL_SCROLL_CLASS);
	}

	onWheel(e) {
		if (e.shiftKey) {
			return;
		}

		const { model, table } = this;
		if (model.edit().state === 'view') {
			const { scroll } = model;
			const upper = 0;

			Fastdom.measure(() => {
				const lower = table.view.scrollHeight() - table.view.height();
				const top = Math.min(lower, Math.max(upper, scroll().top + e.deltaY));

				scroll({ top }, { source: 'body.core' });
			});
		}
	}

	onMouseDown(e) {
		if (e.which === MOUSE_LEFT_BUTTON) {
			const { area, mode } = this.selection;
			if (area !== 'body') {
				return;
			}

			const path = e.composedPath();

			const pathFinder = new PathService(this.bag.body);
			const cell = pathFinder.cell(path);
			if (mode === 'range') {
				this.rangeStartCell = cell;

				if (this.rangeStartCell) {
					this.view.selection.selectRange(this.rangeStartCell, null, 'body');
				}
			}
		}
	}

	onMouseMove(e) {
		const path = e.composedPath();
		const pathFinder = new PathService(this.bag.body);

		const td = pathFinder.cell(path);

		if (td) {
			const { highlight } = this.view;
			const { rows, cell } = this.model.highlight();

			if (cell) {
				highlight.cell.execute(cell, false);
			}

			const newCell = {
				rowIndex: td.rowIndex,
				columnIndex: td.columnIndex
			};

			if (highlight.cell.canExecute(newCell)) {
				highlight.cell.execute(newCell, true)
			}

			const tr = pathFinder.row(path);
			if (tr) {
				const { index } = tr;

				if (highlight.row.canExecute(index)) {
					rows
						.filter(i => i !== index)
						.forEach(i => highlight.row.execute(i, false));

					highlight.row.execute(index, true);
				}
			}
		}

		if (this.selection.mode === 'range') {
			const startCell = this.rangeStartCell;
			const endCell = td;

			if (startCell && endCell) {
				this.navigate(endCell);
				this.view.selection.selectRange(startCell, endCell, 'body');
			}
		}
	}

	onMouseLeave() {
		const { highlight } = this.view;
		const { rows, cell } = this.model.highlight();

		rows.forEach(rowIndex => highlight.row.execute(rowIndex, false));

		if (cell) {
			highlight.cell.execute(null, false);
		}
	}

	onMouseUp(e) {
		const { mode } = this.selection;
		const { edit } = this.model;
		const path = e.composedPath();

		if (e.which === MOUSE_LEFT_BUTTON) {
			const pathFinder = new PathService(this.bag.body);
			const cell = pathFinder.cell(path);

			if (mode === 'range') {
				this.rangeStartCell = null;
			}

			if (edit().state === 'startBatch') {
				edit({ state: 'endBatch' }, { source: 'body.ctrl' });
				return;
			}

			if (cell) {
				this.select(cell);
				this.navigate(cell);
				if (cell.column.editorOptions.trigger === 'click' && this.view.edit.cell.enter.canExecute(cell)) {
					if (this.selection.items.length > 1) {
						return;
					}

					this.view.edit.cell.enter.execute(cell);
				}
			}
		}
	}

	select(cell) {
		const { area, mode, unit } = this.selection;
		if (cell.column.type !== 'select' && (area !== 'body' || mode === 'range')) {
			return;
		}

		const model = this.model;
		const editMode = model.edit().mode;
		switch (unit) {
			case 'row': {
				if (cell.column.type === 'select' && cell.column.editorOptions.trigger === 'focus') {
					const focusState = model.focus();
					if (focusState.rowIndex !== cell.rowIndex || focusState.columnIndex !== cell.columnIndex) {
						this.view.selection.toggleRow.execute(cell.row, 'body');
					}
				} else if (!editMode && cell.column.class !== 'control') {
					this.view.selection.toggleRow.execute(cell.row, 'body');
				}
				break;
			}

			case 'column': {
				if (!editMode) {
					this.view.selection.toggleColumn.execute(cell.column, 'body');
				}
				break;
			}

			case 'mix': {
				if (cell.column.type === 'row-indicator') {
					this.view.selection.toggleCell.execute(cell, 'body');
				}
			}
		}
	}

	navigate(cell) {
		const focus = this.view.nav.focus;
		if (focus.canExecute(cell)) {
			focus.execute(cell);
		}
	}

	get selection() {
		return this.model.selection();
	}
}

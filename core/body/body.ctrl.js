import { PathService } from '../path';
import { View } from '../view/view';

export class BodyCtrl extends View {
	constructor(model, view, bag) {
		super(model);

		this.view = view;
		this.bag = bag;
		this.rangeStartCell = null;		
	}

	onScroll(e) {
		const scroll = this.model.scroll;

		const oldValue = scroll();
		const newValue = {};
		let hasChanges = false;
		if (oldValue.top !== e.scrollTop) {
			newValue.top = e.scrollTop;
			hasChanges = true;
		}

		if (oldValue.left !== e.scrollLeft) {
			newValue.left = e.scrollLeft;
			hasChanges = true;
		}

		if (hasChanges) {
			scroll(newValue, {
				source: 'body.core',
				behavior: 'core'
			});
		}
	}

	onWheel(e) {
		const model = this.model;
		if (model.edit().state === 'view') {
			const scroll = model.scroll;
			const upper = 0;
			const lower = e.scrollHeight - e.offsetHeight;
			const top = Math.min(lower, Math.max(upper, scroll().top + e.deltaY));

			scroll({ top }, { source: 'body.core' });
		}
	}

	onClick(e) {
		const pathFinder = new PathService(this.bag.body);
		const cell = pathFinder.cell(e.path);
		if (cell) {
			this.select(cell);
			this.navigate(cell);
			if (cell.column.editorOptions.trigger === 'click' && this.view.edit.cell.enter.canExecute(cell)) {
				this.view.edit.cell.enter.execute(cell);
			}
		}
	}

	onMouseDown(e) {
		const selectionState = this.selection;
		if (selectionState.area !== 'body') {
			return;
		}

		const pathFinder = new PathService(this.bag.body);
		const cell = pathFinder.cell(e.path);

		const editMode = this.model.edit().mode;
		if (selectionState.mode === 'range') {
			if (!editMode) {
				this.rangeStartCell = cell;
				if (this.rangeStartCell) {
					this.view.selection.selectRange(this.rangeStartCell, null, 'body');
				}
			}
		}
	}

	onMouseMove(e) {
		const pathFinder = new PathService(this.bag.body);
		const row = pathFinder.row(e.path);
		if (row) {
			const index = row.index;
			const highlightRow = this.view.highlight.row;
			if (highlightRow.canExecute(index)) {
				this.model
					.highlight()
					.rows
					.filter(i => i !== index)
					.forEach(i => highlightRow.execute(i, false));

				highlightRow.execute(index, true);
			}
		}

		if (this.selection.mode === 'range') {
			const startCell = this.rangeStartCell;
			const endCell = pathFinder.cell(e.path);

			if (startCell && endCell) {
				this.navigate(endCell);
				this.view.selection.selectRange(startCell, endCell, 'body');
			}
		}
	}

	onMouseLeave() {
		const highlightRow = this.view.highlight.row;
		this.model
			.highlight()
			.rows
			.forEach(i => highlightRow.execute(i, false));
	}

	onMouseUp() {
		if (this.selection.mode === 'range') {
			this.rangeStartCell = null;
		}
	}

	select(cell) {
		const selectionState = this.selection;
		if (cell.column.type !== 'select' &&
			(selectionState.area !== 'body' || selectionState.mode === 'range')) {
			return;
		}

		const model = this.model;
		const editMode = model.edit().mode;
		switch (selectionState.unit) {
			case 'row': {
				if (cell.column.type === 'select' && cell.column.editorOptions.trigger === 'focus') {
					const focusState = model.focus();
					if (focusState.rowIndex !== cell.rowIndex || focusState.columnIndex !== cell.columnIndex) {
						this.view.selection.toggleRow.execute(cell.row, 'body');
					}
				} else if (!editMode && cell.column.canEdit) {
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
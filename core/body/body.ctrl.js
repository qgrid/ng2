import { PathService } from '../path';
import { View } from '../view/view';
import { Fastdom } from '../services/fastdom';
import { CellEditor } from '../edit/edit.cell.editor';

const MOUSE_LEFT_BUTTON = 1;

export class BodyCtrl extends View {
	constructor(model, view, table, bag) {
		super(model);

		this.view = view;
		this.bag = bag;
		this.table = table;
		this.rangeStartCell = null;
		this.editState = this.model.edit().state;
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
			const table = this.table;
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
			const selectionState = this.selection;
			if (selectionState.area !== 'body') {
				return;
			}

			const pathFinder = new PathService(this.bag.body);
			const cell = pathFinder.cell(e.path);

			const editMode = this.model.edit().mode;
			if (selectionState.mode === 'range') {

				if (!editMode || editMode === 'batch') {
					this.rangeStartCell = cell;
					if (this.rangeStartCell) {
						this.view.selection.selectRange(this.rangeStartCell, null, 'body');
					}
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

	onMouseUp(e) {
		const mode = this.selection.mode;

		if (e.which === MOUSE_LEFT_BUTTON) {
			const pathFinder = new PathService(this.bag.body);
			const cell = pathFinder.cell(e.path);

			if (this.model.edit().mode === 'batch' && this.model.edit().state === 'batch') {
				this.doBatch(this.rangeStartCell);
			}

			if (mode === 'range') {
				this.rangeStartCell = null;
			}

			if (cell) {
				this.select(cell);
				this.navigate(cell);
				if (cell.column.editorOptions.trigger === 'click' && this.view.edit.cell.enter.canExecute(cell)) {
					this.view.edit.cell.enter.execute(cell);
				}
			}
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

	doBatch(startCell) {
			const label = startCell.label;
			const value = startCell.value;
			const initialType = startCell.column.type;
			const columnIndices = this.model.columnList().index;
			const cells = [];

			this.selection.items.forEach(item => {
				const {row, column} = item;
				const key = column.key;
				const columnIndex = columnIndices.indexOf(key);
				const rowIndex = row.id;
				const cellView = this.table.body.cell(rowIndex, columnIndex).model();

				cells.push(cellView.model);
			});

			cells.forEach(cell => {
				const type = cell.column.type;

				if (initialType === type && initialType !== 'id') {
					const cellEditor = new CellEditor(cell);
					cellEditor.label = label;
					cellEditor.value = value;
					cellEditor.commit();
				}
			});

		this.setInitialEditState();
	}

	setInitialEditState() {
		this.model.edit({state: this.editState});
	}

	get selection() {
		return this.model.selection();
	}
}

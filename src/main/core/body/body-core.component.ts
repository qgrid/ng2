import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {EventListener} from 'ng2-qgrid/core/infrastructure/event.listener';
import {EventManager} from 'ng2-qgrid/core/infrastructure/event.manager';
import {ViewCoreService} from '../view/view-core.service';
import {NgComponent, RootService} from 'ng2-qgrid/infrastructure/component';
import {PathService} from 'ng2-qgrid/core/path';
import {TableCoreService} from '../table/table-core.service';
import {ColumnView} from 'ng2-qgrid/core/scene/view/column.view';

@Component({
	selector: 'tbody[q-grid-core-body]',
	templateUrl: './body-core.component.html'
})
export class BodyCoreComponent extends NgComponent implements OnInit, OnDestroy {
	private element: Element = null;
	private rangeStartCell = null;
	private scrollContext = {
		top: 0,
		left: 0
	};

	constructor(element: ElementRef,
					public $view: ViewCoreService,
					public $table: TableCoreService,
					private root: RootService) {
		super();

		this.element = element.nativeElement;
		this.scrollContext = {
			top: this.element.scrollTop,
			left: this.element.scrollLeft
		};
	}

	ngOnInit() {
		super.ngOnInit();

		const listener = new EventListener(this.element, new EventManager(this, this.root.applyFactory(null, 'sync')));

		this.using(listener.on('scroll', this.onScroll));
		this.using(listener.on('click', this.onClick));
		this.using(listener.on('mousedown', this.onMouseDown));
		this.using(listener.on('mouseup', this.onMouseUp));

		this.using(listener.on('mousemove', this.onMouseMove));
		this.using(listener.on('mouseleave', this.onMouseLeave));
	}

	onScroll() {
		const element = this.element;
		const scroll = this.model.scroll;

		const oldValue = this.scrollContext;
		const newValue: { [k: string]: any } = {};
		if (oldValue.top !== element.scrollTop) {
			oldValue.top = newValue.top = element.scrollTop;
		}

		if (oldValue.left !== element.scrollLeft) {
			oldValue.left = newValue.left = element.scrollLeft;
		}

		if (Object.keys(newValue)) {
			scroll(newValue, {source: 'body.core'});
		}
	}

	onClick(e) {
		const pathFinder = new PathService(this.root.bag.body);
		const cell = pathFinder.cell(e.path);
		if (cell) {
			this.navigate(cell);

			if (cell.column.editorOptions.trigger === 'click' && this.$view.edit.cell.enter.canExecute(cell)) {
				this.$view.edit.cell.enter.execute(cell);
			}
		}
	}

	onMouseDown(e) {
		const selectionState = this.selection;
		const pathFinder = new PathService(this.root.bag.body);
		if (selectionState.area !== 'body') {
			return;
		}

		if (selectionState.mode === 'range') {
			this.rangeStartCell = pathFinder.cell(e.path);

			if (this.rangeStartCell) {
				this.$view.selection.selectRange(this.rangeStartCell, null, 'body');
			}

			return;
		}

		switch (selectionState.unit) {
			case 'row': {
				const cell = pathFinder.cell(e.path);
				if (cell && cell.column.type !== 'select') {
					this.$view.selection.toggleRow.execute(cell.row, 'body');
				}
				break;
			}

			case 'column': {
				const cell = pathFinder.cell(e.path);
				if (cell) {
					this.$view.selection.toggleColumn.execute(cell.column, 'body');
				}
				break;
			}

			case 'mix': {
				const cell = pathFinder.cell(e.path);
				if (cell && cell.column.type === 'row-indicator') {
					this.$view.selection.toggleCell.execute(cell, 'body');
				}
			}

			default:
				break;
		}
	}

	onMouseMove(e) {
		const pathFinder = new PathService(this.root.bag.body);
		const row = pathFinder.row(e.path);
		if (row) {
			const index = row.index;
			const highlightRow = this.$view.highlight.row;
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
				this.$view.selection.selectRange(startCell, endCell, 'body');
				this.navigate(endCell);
			}
		}
	}

	onMouseLeave() {
		const highlightRow = this.$view.highlight.row;
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

	navigate(cell) {
		const focus = this.$view.nav.focusCell;
		if (focus.canExecute(cell)) {
			focus.execute(cell);
		}
	}

	get selection() {
		return this.model.selection();
	}

	get model() {
		return this.root.model;
	}

	columnKey(index: number, item: ColumnView) {
		return item.model.key;
	}

	rowIndex(index: number) {
		return index;
	}
}

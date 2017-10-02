import { Directive, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';
import { ViewCoreService } from '../view/view-core.service';
import { TableCoreService } from '../table/table-core.service';
import { RootService } from 'ng2-qgrid/infrastructure/component';
import { CellService } from 'ng2-qgrid/main/core/cell';
import { AppError } from 'ng2-qgrid/core/infrastructure';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { ColumnView } from 'ng2-qgrid/core/scene/view/column.view';
import { TrCoreDirective } from '../row/tr-core.directive';

@Directive({
	selector: '[q-grid-core-td]',
})
export class TdCoreDirective implements OnInit, OnDestroy {
	@Input('q-grid-core-td') public columnView: ColumnView;
	public element: HTMLElement = null;
	private $implicit = this;

	constructor(public $view: ViewCoreService,
		private root: RootService,
		private viewContainerRef: ViewContainerRef,
		private cellService: CellService,
		private table: TableCoreService,
		private tr: TrCoreDirective,
		element: ElementRef) {

		this.element = element.nativeElement.parentNode;
	}

	ngOnInit() {
		const column = this.column;
		const element = this.element;

		this.root.bag.body.addCell(this);
		element.classList.add(`${GRID_PREFIX}-${column.key}`);
		element.classList.add(`${GRID_PREFIX}-${column.type}`);
		if (column.editor) {
			element.classList.add(`${GRID_PREFIX}-${column.editor}`);
		}

		this.mode('init');
	}

	mode(value) {
		switch (value) {
			case 'view':
			case 'init': {
				const link = this.cellService.build('body', this.column, 'view');
				link(this.viewContainerRef, this);
				if (value !== 'init') {
					this.element.classList.remove(`${GRID_PREFIX}-edit`);
				}

				break;
			}
			case 'edit': {
				const link = this.cellService.build('body', this.column, 'edit');
				link(this.viewContainerRef, this);

				this.element.classList.add(`${GRID_PREFIX}-edit`);
			}
				break;
			default:
				throw new AppError('td.core', `Invalid mode ${value}`);
		}
	}

	get value() {
		const column = this.column;
		const row = this.row;
		return this.$view.body.value(row, column);
	}

	set value(value) {
		const column = this.column;
		const row = this.row;
		this.$view.body.value(row, column, value);
	}

	get label() {
		const column = this.column;
		const row = this.row;
		return this.$view.body.label(row, column);
	}

	set label(label) {
		const column = this.column;
		const row = this.row;
		this.$view.body.label(row, column, label);
	}

	get column() {
		return this.columnView.model;
	}

	get columnIndex() {
		return this.columnView.index;
	}

	get row() {
		return this.tr.model;
	}

	get rowIndex() {
		return this.tr.index;
	}

	ngOnDestroy() {
		this.root.bag.body.deleteCell(this);
	}
}

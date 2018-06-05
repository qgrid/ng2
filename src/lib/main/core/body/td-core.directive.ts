import { Directive, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { ColumnView } from 'ng2-qgrid/core/scene/view/column.view';
import { TdCtrl } from 'ng2-qgrid/core/cell/td.ctrl';
import { ViewCoreService } from '../view/view-core.service';
import { TableCoreService } from '../table/table-core.service';
import { RootService } from '../../../infrastructure/component/root.service';
import { TrCoreDirective } from '../row/tr-core.directive';
import { CellService } from '../../../main/core/cell/cell.service';

const classify = TdCtrl.classify;

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
		this.root.bag.body.addCell(this);
		classify(this.element, this.column);

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
		const { column, row, rowIndex, columnIndex } = this;
		return this.$view.body.getValue(row, column, rowIndex, columnIndex);
	}

	set value(value) {
		const { column, row, rowIndex, columnIndex } = this;
		this.$view.body.setValue(row, column, value, rowIndex, columnIndex);
	}

	get label() {
		const { column, row, rowIndex, columnIndex } = this;
		return this.$view.body.getLabel(row, column, rowIndex, columnIndex);
	}

	set label(label) {
		const { column, row, rowIndex, columnIndex } = this;
		this.$view.body.setLabel(row, column, label, rowIndex, columnIndex);
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

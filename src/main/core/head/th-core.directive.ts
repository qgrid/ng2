import {
	Directive,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
	ViewContainerRef
} from '@angular/core';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';
import { RootService } from 'ng2-qgrid/infrastructure/component';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { ColumnView } from 'ng2-qgrid/core/scene/view/column.view';
import { TableCoreService } from '../table/table-core.service';
import { CellService } from '../cell/cell.service';
import { ViewCoreService } from '../view/view-core.service';
import { TrCoreDirective } from '../row/tr-core.directive';

@Directive({
	selector: '[q-grid-core-th]'
})
export class ThCoreDirective implements OnInit, OnDestroy {
	@Input('q-grid-core-th') columnView: ColumnView;
	public element: HTMLElement = null;
	private $implicit = this;

	constructor(
		public $view: ViewCoreService,
		private root: RootService,
		private viewContainerRef: ViewContainerRef,
		private cellService: CellService,
		private table: TableCoreService,
		private tr: TrCoreDirective,
		element: ElementRef
	) {
		this.element = element.nativeElement.parentNode;
	}

	ngOnInit() {
		const column = this.column;
		const element = this.element;

		this.root.bag.head.addCell(this);
		element.classList.add(`${GRID_PREFIX}-${column.key}`);
		element.classList.add(`${GRID_PREFIX}-${column.type}`);
		if (column.editor) {
			element.classList.add(`${GRID_PREFIX}-${column.editor}`);
		}

		const link = this.cellService.build('head', this.column, 'view');
		link(this.viewContainerRef, this);
	}

	get column(): ColumnModel {
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
		this.root.bag.head.deleteCell(this);
	}
}

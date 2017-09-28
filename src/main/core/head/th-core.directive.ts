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
import { TableCoreService } from '../table/table-core.service';
import { CellService } from '../cell/cell.service';
import { ViewCoreService } from '../view/view-core.service';

@Directive({
	selector: '[q-grid-core-th]'
})
export class ThCoreDirective implements OnInit, OnDestroy {
	@Input('q-grid-core-row-index') rowIndex: number;
	@Input('q-grid-core-column-index') columnIndex: number;
	public element: HTMLElement = null;
	private $implicit = this;

	constructor(
		public $view: ViewCoreService,
		private root: RootService,
		private viewContainerRef: ViewContainerRef,
		private cellService: CellService,
		private table: TableCoreService,
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

	get column() {
		return this.row[this.columnIndex].model;
	}

	get row() {
		const model = this.root.model;
		const rows = model.scene().column.rows;
		return rows[this.rowIndex].filter(c => c.model.pin === this.table.pin);
	}

	ngOnDestroy() {
		this.root.bag.head.deleteCell(this);
	}
}

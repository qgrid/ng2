import {Directive, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {GRID_PREFIX} from 'ng2-qgrid/core/definition';
import {ViewCoreService} from '../view/view-core.service';
import {RootService} from 'ng2-qgrid/infrastructure/component';
import {CellService} from '../cell/cell.service';
import {IGetValue} from 'ng2-qgrid/core/services/aggregation';

@Directive({
	selector: '[q-grid-core-tf]'
})
export class TfCoreDirective implements OnInit, OnDestroy {
	@Input('q-grid-core-row-index') rowIndex: number;
	@Input('q-grid-core-column-index') columnIndex: number;
	public element: HTMLElement = null;
	private $implicit = this;

	constructor(public $view: ViewCoreService,
					private root: RootService,
					private cellService: CellService,
					private viewContainerRef: ViewContainerRef,
					element: ElementRef) {

		this.element = element.nativeElement.parentNode;
	}

	ngOnInit() {
		const column = this.column;
		const element = this.element;

		this.root.bag.foot.addCell(this);
		element.classList.add(`${GRID_PREFIX}-${column.key}`);
		element.classList.add(`${GRID_PREFIX}-${column.type}`);
		if (column.editor) {
			element.classList.add(`${GRID_PREFIX}-${column.editor}`);
		}

		const link = this.cellService.build('foot', this.column);
		link(this.viewContainerRef, this);
	}

	get value() {
		const column = this.column;
		return this.$view.foot.value(column);
	}

	get column() {
		const columns = this.root.table.foot.columns(this.rowIndex);
		return columns[this.columnIndex].model();
	}

	get row() {
		return this.$view.foot.rows[this.rowIndex];
	}

	ngOnDestroy() {
		this.root.bag.foot.deleteCell(this);
	}
}

import {
	Directive,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
	ViewContainerRef
} from '@angular/core';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { ColumnView } from 'ng2-qgrid/core/scene/view/column.view';
import { TdCtrl } from 'ng2-qgrid/core/cell/td.ctrl';
import { ThCtrl } from 'ng2-qgrid/core/cell/th.ctrl';
import { Td } from 'ng2-qgrid/core/dom/td';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { FilterRowColumnModel } from 'ng2-qgrid/core/column-type/filter.row.column';
import { CellService } from '../cell/cell.service';
import { RootService } from '../../../infrastructure/component/root.service';
import { ViewCoreService } from '../view/view-core.service';
import { TrhCoreDirective } from '../row/trh-core.directive';

const classifyTd = TdCtrl.classify;
const classifyTh = ThCtrl.classify;

@Directive({
	selector: '[q-grid-core-th]'
})
export class ThCoreDirective implements Td, OnInit, OnDestroy {
	@Input('q-grid-core-th') columnView: ColumnView;
	element: HTMLElement = null;
	value: any;
	label: any;

	private $implicit = this;

	constructor(
		public $view: ViewCoreService,
		private root: RootService,
		private viewContainerRef: ViewContainerRef,
		private cellService: CellService,
		private tr: TrhCoreDirective,
		element: ElementRef
	) {
		this.element = element.nativeElement.parentNode;
	}

	ngOnInit() {
		const column = this.column;
		const element = this.element;

		this.root.bag.head.addCell(this);
		classifyTd(element, column);
		classifyTh(element, column);

		let target: any = column;
		let source = 'head';
		if (column.type === 'filter-row') {
			const columnModel = (column as FilterRowColumnModel).model;
			classifyTd(element, columnModel);

			source = 'filter';
			target = columnModel;
		}

		const link = this.cellService.build(source, target, 'view');
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

	mode(value: string): void {
		throw new AppError('th-core.directive', `${value} mode is not supported`);
	}

	ngOnDestroy() {
		this.root.bag.head.deleteCell(this);
	}
}

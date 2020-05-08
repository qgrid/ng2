import {
	Directive,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
	ViewContainerRef
} from '@angular/core';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { ColumnView } from '@qgrid/core/scene/view/column.view';
import { TdCtrl } from '@qgrid/core/cell/td.ctrl';
import { ThCtrl } from '@qgrid/core/cell/th.ctrl';
import { AppError } from '@qgrid/core/infrastructure/error';
import { FilterRowColumnModel } from '@qgrid/core/column-type/filter.row.column';
import { DomTd } from '../dom/dom';
import { CellService } from '../cell/cell.service';
import { GridLet } from '../grid/grid-let';
import { TrhCoreDirective } from '../row/trh-core.directive';
import { GridPlugin } from '../plugin/grid-plugin';

const classifyTd = TdCtrl.classify;
const classifyTh = ThCtrl.classify;

@Directive({
	selector: '[q-grid-core-th]'
})
export class ThCoreDirective implements DomTd, OnInit, OnDestroy {
	@Input('q-grid-core-th') columnView: ColumnView;

	$implicit = this;
	element: HTMLElement;
	value: any;
	label: any;

	constructor(
		public $view: GridLet,
		private root: GridPlugin,
		private viewContainerRef: ViewContainerRef,
		private cellService: CellService,
		private tr: TrhCoreDirective,
		elementRef: ElementRef
	) {
		this.element = elementRef.nativeElement.parentNode;
	}

	ngOnInit() {
		const { column, element } = this;
		const { table } = this.root;

		table.box.bag.head.addCell(this);
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
		return this.columnView.columnIndex;
	}

	get row() {
		return this.tr.model;
	}

	get rowIndex() {
		return this.tr.index;
	}

	mode(value: string): void {
		throw new AppError(
			'th-core.directive',
			`${value} mode is not supported`
		);
	}

	ngOnDestroy() {
		const { table } = this.root;
		table.box.bag.head.deleteCell(this);
	}
}

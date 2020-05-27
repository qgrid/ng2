import {
	Directive,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
	ViewContainerRef
} from '@angular/core';
import { CellClassService } from '../cell/cell-class.service';
import { CellTemplateService } from '../cell/cell-template.service';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { ColumnView } from '@qgrid/core/scene/view/column.view';
import { DomTd } from '../dom/dom';
import { FilterRowColumnModel } from '@qgrid/core/column-type/filter.row.column';
import { GridError } from '@qgrid/core/infrastructure/error';
import { GridLet } from '../grid/grid-let';
import { GridPlugin } from '../plugin/grid-plugin';
import { TrhCoreDirective } from '../row/trh-core.directive';

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
		private cellTemplate: CellTemplateService,
		private cellClass: CellClassService,
		private tr: TrhCoreDirective,
		elementRef: ElementRef
	) {
		this.element = elementRef.nativeElement.parentNode;
	}

	ngOnInit() {
		const { column, element } = this;
		const { table } = this.root;

		table.box.bag.head.addCell(this);

		let targetColumn: ColumnModel = column;
		let targetSource = 'head';

		if (column.type === 'filter-row') {
			targetSource = 'filter';
			targetColumn = (column as FilterRowColumnModel).model;
			this.element.classList.add('q-grid-filter-row');
		}

		this.cellClass.toHead(element, column);
		this.cellClass.toBody(element, targetColumn);


		const link = this.cellTemplate.build(targetSource, targetColumn, 'view');
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
		throw new GridError(
			'th-core.directive',
			`${value} mode is not supported`
		);
	}

	ngOnDestroy() {
		const { table } = this.root;
		table.box.bag.head.deleteCell(this);
	}
}

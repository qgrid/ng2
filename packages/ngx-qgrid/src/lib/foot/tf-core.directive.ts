import {
	Directive,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
	ViewContainerRef
} from '@angular/core';
import { GridError } from '@qgrid/core/infrastructure/error';
import { CellTemplateService } from '../cell/cell-template.service';
import { CellClassService } from '../cell/cell-class.service';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { ColumnView } from '@qgrid/core/scene/view/column.view';
import { DomTd } from '../dom/dom';
import { GridLet } from '../grid/grid-let';
import { GridPlugin } from '../plugin/grid-plugin';
import { TrhCoreDirective } from '../row/trh-core.directive';

@Directive({
	selector: '[q-grid-core-tf]'
})
export class TfCoreDirective implements DomTd, OnInit, OnDestroy {
	$implicit = this;

	@Input('q-grid-core-tf') columnView: ColumnView;
	element: HTMLElement = null;

	constructor(
		public $view: GridLet,
		private plugin: GridPlugin,
		private cellTemplate: CellTemplateService,
		private cellClass: CellClassService,
		private viewContainerRef: ViewContainerRef,
		private tr: TrhCoreDirective,
		elementRef: ElementRef
	) {
		this.element = elementRef.nativeElement.parentNode;
	}

	ngOnInit() {
		const { column, element } = this;
		const { table } = this.plugin;

		table.box.bag.foot.addCell(this);

		this.cellClass.toBody(element, column);

		const link = this.cellTemplate.build('foot', this.column);
		link(this.viewContainerRef, this);
	}

	get value() {
		const column = this.column;
		return this.$view.foot.value(column);
	}

	get label() {
		return this.label;
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
		throw new GridError('tf-core.directive', `${value} mode is not supported`);
	}

	ngOnDestroy() {
		const { table } = this.plugin;
		table.box.bag.foot.deleteCell(this);
	}
}

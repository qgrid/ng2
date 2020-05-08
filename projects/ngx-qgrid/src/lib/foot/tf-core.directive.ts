import {
	Directive,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
	ViewContainerRef
} from '@angular/core';
import { AppError } from '@qgrid/core/infrastructure/error';
import { CellService } from '../cell/cell.service';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { ColumnView } from '@qgrid/core/scene/view/column.view';
import { DomTd } from '../dom/dom';
import { GridLet } from '../grid/grid-let';
import { GridPlugin } from '../plugin/grid-plugin';
import { TdCtrl } from '@qgrid/core/cell/td.ctrl';
import { TrhCoreDirective } from '../row/trh-core.directive';

const classify = TdCtrl.classify;

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
		private cellService: CellService,
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
		classify(element, column);

		const link = this.cellService.build('foot', this.column);
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
		throw new AppError('tf-core.directive', `${value} mode is not supported`);
	}

	ngOnDestroy() {
		const { table } = this.plugin;
		table.box.bag.foot.deleteCell(this);
	}
}

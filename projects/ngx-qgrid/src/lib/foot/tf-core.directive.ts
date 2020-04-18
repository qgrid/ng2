import {
	Directive,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
	ViewContainerRef
} from '@angular/core';
import { ColumnView } from '@qgrid/core/scene/view/column.view';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { TdCtrl } from '@qgrid/core/cell/td.ctrl';
import { DomTd } from '../dom/dom';
import { AppError } from '@qgrid/core/infrastructure/error';
import { GridView } from '../grid/grid-view';
import { GridRoot } from '../grid/grid-root';
import { CellService } from '../cell/cell.service';
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
		public $view: GridView,
		private root: GridRoot,
		private cellService: CellService,
		private viewContainerRef: ViewContainerRef,
		private tr: TrhCoreDirective,
		elementRef: ElementRef
	) {
		this.element = elementRef.nativeElement.parentNode;
	}

	ngOnInit() {
		const column = this.column;
		const element = this.element;

		this.root.bag.foot.addCell(this);
		classify(element, column);

		const link = this.cellService.build('foot', this.column);
		if (!link) {
			throw new AppError(
				`tf-core.directive`,
				`Can't find template link for ${this.column.key}`
			);
		}

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
		this.root.bag.foot.deleteCell(this);
	}
}

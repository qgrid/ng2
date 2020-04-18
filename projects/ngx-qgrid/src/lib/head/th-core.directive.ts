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
import { GridRoot } from '../grid/grid-root';
import { GridView } from '../grid/grid-view';
import { TrhCoreDirective } from '../row/trh-core.directive';

const classifyTd = TdCtrl.classify;
const classifyTh = ThCtrl.classify;

@Directive({
	selector: '[q-grid-core-th]'
})
export class ThCoreDirective implements DomTd, OnInit, OnDestroy {
	@Input('q-grid-core-th') columnView: ColumnView;
	element: HTMLElement = null;
	value: any;
	label: any;

	private $implicit = this;

	constructor(
		public $view: GridView,
		private root: GridRoot,
		private viewContainerRef: ViewContainerRef,
		private cellService: CellService,
		private tr: TrhCoreDirective,
		elementRef: ElementRef
	) {
		this.element = elementRef.nativeElement.parentNode;
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
		if (!link) {
			throw new AppError(
				`th-core.directive`,
				`Can't find template link for ${this.column.key}`
			);
		}

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
		throw new AppError('th-core.directive', `${value} mode is not supported`);
	}

	ngOnDestroy() {
		this.root.bag.head.deleteCell(this);
	}
}

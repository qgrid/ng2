import {
	Directive,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
	ViewContainerRef
} from '@angular/core';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';
import { ColumnView } from 'ng2-qgrid/core/scene/view/column.view';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { TdCtrl } from 'ng2-qgrid/core/cell/td.ctrl';
import { Td } from 'ng2-qgrid/core/dom/td';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { ViewCoreService } from '../view/view-core.service';
import { RootService } from '../../../infrastructure/component/root.service';
import { CellService } from '../cell/cell.service';
import { TrhCoreDirective } from '../row/trh-core.directive';

const classify = TdCtrl.classify;

@Directive({
	selector: '[q-grid-core-tf]'
})
export class TfCoreDirective implements Td, OnInit, OnDestroy {
	@Input('q-grid-core-tf') columnView: ColumnView;
	public element: HTMLElement = null;
	private $implicit = this;

	constructor(
		public $view: ViewCoreService,
		private root: RootService,
		private cellService: CellService,
		private viewContainerRef: ViewContainerRef,
		private tr: TrhCoreDirective,
		element: ElementRef
	) {
		this.element = element.nativeElement.parentNode;
	}

	ngOnInit() {
		const column = this.column;
		const element = this.element;

		this.root.bag.foot.addCell(this);
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
		return this.columnView.index;
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

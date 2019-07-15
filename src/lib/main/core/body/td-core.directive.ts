import { Directive, ElementRef, Input, OnDestroy, OnInit,
		ViewContainerRef, ChangeDetectorRef, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { ColumnView } from 'ng2-qgrid/core/scene/view/column.view';
import { TdCtrl } from 'ng2-qgrid/core/cell/td.ctrl';
import { Td } from 'ng2-qgrid/core/dom/td';
import { ViewCoreService } from '../view/view-core.service';
import { RootService } from '../../../infrastructure/component/root.service';
import { TrCoreDirective } from '../row/tr-core.directive';
import { CellService } from '../../../main/core/cell/cell.service';

const classify = TdCtrl.classify;

@Directive({
	selector: '[q-grid-core-td]',
})
export class TdCoreDirective implements Td, OnInit, OnDestroy, OnChanges {
	private $implicit = this;
	@Input('q-grid-core-value') private actualValue: any;

	@Input('q-grid-core-td') columnView: ColumnView;

	element: HTMLElement = null;
	changes: SimpleChange = null;

	constructor(
		public $view: ViewCoreService,
		private root: RootService,
		private viewContainerRef: ViewContainerRef,
		private cellService: CellService,
		private tr: TrCoreDirective,
		private cd: ChangeDetectorRef,
		elementRef: ElementRef
	) {
		this.element = elementRef.nativeElement.parentNode;
	}

	ngOnInit() {
		this.root.bag.body.addCell(this);
		classify(this.element, this.column);

		const link = this.cellService.build('body', this.column, 'view');
		link(this.viewContainerRef, this);
	}

	ngOnChanges(changes: SimpleChanges) {

		const { changedValue } = changes;

		if (changedValue && !changedValue.firstChange && (changedValue.currentValue !== changedValue.previousValue)) {
			this.changes = changedValue;
			this.mode('change');
		}
	}

	mode(value: 'view' | 'edit' | 'change') {
		switch (value) {
			case 'view': {
				this.element.classList.remove(`${GRID_PREFIX}-edit`);

				const link = this.cellService.build('body', this.column, 'view');
				link(this.viewContainerRef, this);
				this.cd.markForCheck();
				this.cd.detectChanges();
				break;
			}
			case 'edit': {
				this.element.classList.add(`${GRID_PREFIX}-edit`);

				const link = this.cellService.build('body', this.column, 'edit');
				link(this.viewContainerRef, this);
				this.cd.markForCheck();
				this.cd.detectChanges();
				break;
			}
			case 'change': {
				this.element.classList.add(`${GRID_PREFIX}-change`);

				const link = this.cellService.build('body', this.column, 'change');
				link(this.viewContainerRef, this);
				this.cd.markForCheck();
				this.cd.detectChanges();
				break;
			}
			default:
				throw new AppError('td.core', `Invalid mode ${value}`);
		}
	}

	get value() {
		return this.actualValue;
	}
	set value(value) {
		const { column, row, rowIndex, columnIndex } = this;
		this.$view.body.render.setValue(row, column, value, rowIndex, columnIndex);
	}

	get label() {
		const { column, row, rowIndex, columnIndex } = this;
		return this.$view.body.render.getLabel(row, column, rowIndex, columnIndex);
	}

	set label(label) {
		const { column, row, rowIndex, columnIndex } = this;
		this.$view.body.render.setLabel(row, column, label, rowIndex, columnIndex);
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

	ngOnDestroy() {
		this.root.bag.body.deleteCell(this);
	}
}

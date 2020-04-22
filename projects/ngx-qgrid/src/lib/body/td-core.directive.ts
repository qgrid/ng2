import {
	Directive,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
	ViewContainerRef,
	ChangeDetectorRef,
	OnChanges,
	SimpleChanges,
	SimpleChange
} from '@angular/core';
import { GRID_PREFIX } from '@qgrid/core/definition';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { ColumnView } from '@qgrid/core/scene/view/column.view';
import { TdCtrl } from '@qgrid/core/cell/td.ctrl';
import { DomTd } from '../dom/dom';
import { noop } from '@qgrid/core/utility/kit';
import { GridView } from '../grid/grid-view';
import { GridRoot } from '../grid/grid-root';
import { TrCoreDirective } from '../row/tr-core.directive';
import { CellService } from '../cell/cell.service';
import { GridError } from '../infrastructure/error';

const classify = TdCtrl.classify;

@Directive({
	selector: '[q-grid-core-td]',
})
export class TdCoreDirective implements DomTd, OnInit, OnDestroy, OnChanges {
	private $implicit = this;
	@Input('q-grid-core-value') private actualValue: any;
	@Input('q-grid-core-label') private actualLabel: any;

	@Input('q-grid-core-td') columnView: ColumnView;

	element: HTMLElement;
	changes: SimpleChange;

	constructor(
		public $view: GridView,
		private root: GridRoot,
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
		if (!link) {
			throw new GridError(
				`td-core.directive`,
				`Can't find template link for body of ${this.column.key}`
			);
		}

		link(this.viewContainerRef, this);
	}

	ngOnChanges(changes: SimpleChanges) {
		const { actualLabel } = changes;
		if (actualLabel && !actualLabel.firstChange && actualLabel.currentValue !== actualLabel.previousValue) {
			this.changes = actualLabel;
			this.mode('change');
		}
	}

	mode(value: 'view' | 'edit' | 'change') {
		const link = this.cellService.build('body', this.column, value);

		switch (value) {
			case 'view': {
				if (!link) {
					throw new GridError(
						`td-core.directive`,
						`Can't find template link for body of ${this.column.key}`
					);
				}

				this.element.classList.remove(`${GRID_PREFIX}-change`);
				this.element.classList.remove(`${GRID_PREFIX}-edit`);

				if (link !== noop) {
					link(this.viewContainerRef, this);
					this.cd.markForCheck();
					this.cd.detectChanges();
				}
				break;
			}
			case 'edit': {
				if (!link || link === noop) {
					throw new GridError(
						`td-core.directive`,
						`Can't find template link for edit of ${this.column.key}`
					);
				}

				this.element.classList.add(`${GRID_PREFIX}-${value}`);
				link(this.viewContainerRef, this);
				this.cd.markForCheck();
				this.cd.detectChanges();
				break;
			}
			case 'change': {
				if (link && link !== noop) {
					this.element.classList.add(`${GRID_PREFIX}-${value}`);
					link(this.viewContainerRef, this);
					this.cd.markForCheck();
					this.cd.detectChanges();
				}
				break;
			}
			default: {
				throw new GridError('td-core.directive', `Invalid mode ${value}`);
			}
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
		return this.actualLabel;
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

	get dataRowIndex() {
		const { model } = this.root;
		return model.data().rows.indexOf(this.row);
	}

	ngOnDestroy() {
		this.root.bag.body.deleteCell(this);
	}
}

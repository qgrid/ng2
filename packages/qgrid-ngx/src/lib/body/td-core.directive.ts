import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import {
  ColumnModel,
  ColumnView,
  GridError,
  GRID_PREFIX,
  noop,
} from '@qgrid/core';
import { CellClassService } from '../cell/cell-class.service';
import { CellTemplateService } from '../cell/cell-template.service';
import { DomTd } from '../dom/dom';
import { GridLet } from '../grid/grid-let';
import { GridRoot } from '../grid/grid-root';
import { TrCoreDirective } from '../row/tr-core.directive';

@Directive({
  selector: '[q-grid-core-td]',
})
export class TdCoreDirective implements DomTd, OnInit, OnDestroy, OnChanges {
  @Input('q-grid-core-value') actualValue: unknown;
  @Input('q-grid-core-label') actualLabel: unknown;

  @Input('q-grid-core-td') columnView: ColumnView;

  $implicit = this;

  element: HTMLElement;
  changes: SimpleChange;

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
    const { rows } = model.data();
    return rows.indexOf(this.row);
  }

  constructor(
    public $view: GridLet,
    private root: GridRoot,
    private viewContainerRef: ViewContainerRef,
    private cellTemplate: CellTemplateService,
    private cellClass: CellClassService,
    private tr: TrCoreDirective,
    private cd: ChangeDetectorRef,
    elementRef: ElementRef,
  ) {
    this.element = elementRef.nativeElement.parentNode;
  }

  ngOnInit() {
    const { table } = this.root;
    table.box.bag.body.addCell(this);

    this.cellClass.toBody(this.element, this.column);

    const link = this.cellTemplate.build('body', this.column, 'view');
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
    const link = this.cellTemplate.build('body', this.column, value);

    switch (value) {
      case 'view': {
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
        if (link === noop) {
          throw new GridError(
            'td-core.directive',
            `Can't find template link for edit of ${this.column.key}`,
          );
        }

        this.element.classList.add(`${GRID_PREFIX}-${value}`);
        link(this.viewContainerRef, this);
        this.cd.markForCheck();
        this.cd.detectChanges();
        break;
      }
      case 'change': {
        if (link !== noop) {
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

  ngOnDestroy() {
    const { table } = this.root;
    table.box.bag.body.deleteCell(this);
  }
}

import {Directive, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {GRID_PREFIX} from '@grid/core/definition';
import {ViewCoreService} from '../view/view-core.service';
import {RootService} from '@grid/infrastructure/component';
import {CellService} from '@grid/main/core/cell';
import {AppError} from '@grid/core/infrastructure/';

@Directive({
  selector: '[q-grid-core-td]',
})
export class TdCoreDirective implements OnInit, OnDestroy {
  @Input('q-grid-core-row-index') rowIndex: number;
  @Input('q-grid-core-column-index') columnIndex: number;
  private element: HTMLElement = null;
  private $implicit = this;

  constructor(public $view: ViewCoreService,
              private root: RootService,
              private viewContainerRef: ViewContainerRef,
              private cellService: CellService,
              element: ElementRef) {

    this.element = element.nativeElement.parentNode;
  }

  ngOnInit() {
    const column = this.column;
    const element = this.element;

    this.root.bag.set(element, this);
    element.classList.add(`${GRID_PREFIX}-${column.key}`);
    element.classList.add(`${GRID_PREFIX}-${column.type}`);
    if (column.editor) {
      element.classList.add(`${GRID_PREFIX}-${column.editor}`);
    }

    this.mode('init');
  }

  mode(value) {
    switch (value) {
      case 'view':
      case 'init': {
        const link = this.cellService.build('body', this.column, 'view');
        link(this.viewContainerRef, this);
        if (value !== 'init') {
          this.element.classList.remove(`${GRID_PREFIX}-edit`);
        }
        break;
      }
      case 'edit': {
        const link = this.cellService.build('body', this.column, 'edit');
        link(this.viewContainerRef, this);
        this.element.classList.add(`${GRID_PREFIX}-edit`);
      }
        break;
      default:
        throw new AppError('td.core', `Invalid mode ${value}`);
    }
  }

  get value() {
    const column = this.column;
    const row = this.row;
    return this.$view.body.value(row, column);
  }

  set value(value) {
    const column = this.column;
    const row = this.row;
    this.$view.body.value(row, column, value);
  }

  get label() {
    const column = this.column;
    const row = this.row;
    return this.$view.body.label(row, column);
  }

  set label(label) {
    const column = this.column;
    const row = this.row;
    this.$view.body.label(row, column, label);
  }

  get column() {
    return this.$view.body.columns[this.columnIndex].model;
  }

  get row() {
    return this.$view.body.rows[this.rowIndex];
  }

  ngOnDestroy() {
    const element = this.element;
    this.root.bag.delete(element);
  }
}

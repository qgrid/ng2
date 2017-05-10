import {Directive, ElementRef, Input, OnInit, ViewContainerRef} from '@angular/core';
import {VIEW_CORE_NAME, TF_CORE_NAME} from 'ng/definition';
import {GRID_PREFIX} from 'core/definition';
import {ViewCoreService} from "../view/view-core.service";
import {TemplateCacheService} from "../../services/template-cache.service";

export class TfCoreContext {
  constructor(public $implicit: TfCoreDirective) {
  }

  get $view() {
    return this.$implicit.$view;
  }
}

@Directive({
  selector: '[q-grid-core-tf]'
})
export class TfCoreDirective implements OnInit {
  @Input('q-grid-core-row-index') rowIndex: number;
  @Input('q-grid-core-column-index') columnIndex: number;
  private element: HTMLElement = null;

  constructor(public $view: ViewCoreService,
              private templateCache: TemplateCacheService,
              private viewContainerRef: ViewContainerRef,
              element: ElementRef) {
    this.element = element.nativeElement.element;
  }

  ngOnInit() {
    const column = this.column;
    const element = this.element;

    element.classList.add(`${GRID_PREFIX}-${column.key}`);
    element.classList.add(`${GRID_PREFIX}-${column.type}`);
    if (column.hasOwnProperty('editor')) {
      element.classList.add(`${GRID_PREFIX}-${column.editor}`);
    }


    const context = new TfCoreContext(this);
    const template = this.templateCache.get('foot.cell.text.tpl.html');
    this.viewContainerRef.createEmbeddedView(template, context);
  }

  get value() {
    const column = this.column;
    return this.$view.foot.value(column);
  }

  get column() {
    return this.row[this.columnIndex].model;
  }

  get row() {
    return this.$view.foot.rows[this.rowIndex];
  }
}

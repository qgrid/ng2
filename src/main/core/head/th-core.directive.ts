import {Directive, ElementRef, Input, OnInit, ViewContainerRef} from '@angular/core';
import {GRID_PREFIX} from '@grid/core/definition';
import {ViewCoreService} from '../view/view-core.service';
import {RootService} from '../root.service"';
import {TemplateCacheService, TemplateLinkService} from '@grid/template';

@Directive({
  selector: '[q-grid-core-th]'
})
export class ThCoreDirective implements OnInit {
  @Input('q-grid-core-row-index') rowIndex: number;
  @Input('q-grid-core-column-index') columnIndex: number;
  private element: HTMLElement = null;
  private $implicit = this;

  constructor(public $view: ViewCoreService,
              private templateCache: TemplateCacheService,
              private templateLink: TemplateLinkService,
              private viewContainerRef: ViewContainerRef,
              element: ElementRef) {

    this.element = element.nativeElement.parentNode;
  }

  ngOnInit() {
    const column = this.column;
    const element = this.element;

    element.classList.add(`${GRID_PREFIX}-${column.key}`);
    element.classList.add(`${GRID_PREFIX}-${column.type}`);
    if (column.hasOwnProperty('editor')) {
      element.classList.add(`${GRID_PREFIX}-${column.editor}`);
    }

    const template =
      this.templateCache.get('head-cell-text.tpl.html') ||
      this.templateLink.get('head-cell-text.tpl.html');

    this.viewContainerRef.createEmbeddedView(template, this);
  }

  get column() {
    return this.row[this.columnIndex].model;
  }

  get row() {
    return this.$view.head.rows[this.rowIndex];
  }
}

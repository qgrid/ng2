import {Directive, ElementRef, OnInit, ViewContainerRef} from '@angular/core';
//import {VIEW_CORE_NAME, BODY_CORE_NAME} from 'ng2/definition';
import EventListener from 'core/infrastructure/event.listener';
//import * as pathFinder from 'ng2/services/path.find';
import {TemplateCacheService} from "../../services/template-cache.service";
import {ViewCoreService} from "../view/view-core.service";
import {RootService} from "../root.service";

export class BodyCoreContext {
  constructor(public $implicit: ViewCoreService) {
  }
}

@Directive({
  selector: '[q-grid-core-body]'
})
export class BodyCoreDirective implements OnInit {
  private element: HTMLElement = null;
  private documentListener = new EventListener(this, document);
  private listener = null;
  private rangeStartCell = null;

  constructor(element: ElementRef,
              private view: ViewCoreService,
              private root: RootService,
              private viewContainerRef: ViewContainerRef,
              private templateCache: TemplateCacheService) {
    this.element = element.nativeElement;
    this.listener = new EventListener(this, this.element);
  }

  ngOnInit() {
    const context = new BodyCoreContext(this.view);
    const template = this.templateCache.get('body.tpl.html');
    const viewRef = this.viewContainerRef.createEmbeddedView(template, context);

    this.listener.on('scroll', this.onScroll);
    this.listener.on('click', this.onClick);
    this.listener.on('mousedown', this.onMouseDown);
    this.listener.on('mouseup', this.onMouseUp);

    this.documentListener.on('mousemove', this.onMouseMove);
  }

  onScroll() {
    const element = this.element;
    const scroll = this.model.scroll;

    scroll({
      top: element.scrollTop,
      left: element.scrollLeft,
      width: element.scrollWidth,
      height: element.scrollHeight
    }, {
      source: 'body.core',
      pin: this.view.pin
    });
  }

  onDestroy() {
    this.listener.off();
  }

  onClick(e) {
    // const cell = pathFinder.cell(e.path);
    // if (cell) {
    //   this.navigate(cell);
    //
    //   if (cell.column.editorOptions.trigger === 'click'
    //     && this.$view.edit.cell.enter.canExecute(cell)) {
    //       this.$view.edit.cell.enter.execute(cell);
    //   }
    //
    //   if (cell.column.type !== 'select') {
    //     this.$view.selection.selectRange(cell);
    //   }
    // }
  }

  onMouseDown(e) {
    // if (this.selection.mode === 'range') {
    //   this.rangeStartCell = pathFinder.cell(e.path);
    //
    //   if (this.rangeStartCell) {
    //     this.$view.selection.selectRange(this.rangeStartCell);
    //   }
    // }
  }

  onMouseMove(e) {
    // if (this.selection.mode === 'range') {
    //   const startCell = this.rangeStartCell;
    //   const endCell = pathFinder.cell(e.path);
    //
    //   if (startCell && endCell) {
    //     this.$view.selection.selectRange(startCell, endCell);
    //     this.navigate(endCell);
    //   }
    // }
  }

  onMouseUp() {
    if (this.selection.mode === 'range') {
      this.rangeStartCell = null;
    }
  }

  navigate(cell) {
    const focus = this.view.nav.focusCell;
    if (focus.canExecute(cell)) {
      focus.execute(cell);
    }
  }

  get selection() {
    return this.model.selection();
  }

  get model() {
    return this.root.model;
  }
}

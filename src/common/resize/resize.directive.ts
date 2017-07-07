import {Directive, ElementRef, Input, OnDestroy, OnInit, Optional} from '@angular/core';
import {EventListener, EventManager} from '@grid/core/infrastructure';
import {GRID_PREFIX} from '@grid/core/definition';
import {RootService} from '@grid/infrastructure/component';
import {clone} from '@grid/core/utility';

@Directive({
  selector: '[q-grid-resize]'
})
export class ResizeDirective implements OnInit, OnDestroy {
  private element:HTMLElement;
  private listeners;
  private divider;
  private context;

  @Input('model') model;
  @Input('q-grid-resize') key;
  @Input('q-grid-resizable') canResiaze;
  @Input('q-grid-resize-path') resizePath;

  constructor(@Optional() private root:RootService, elementRef:ElementRef) {
    this.element = elementRef.nativeElement;
    this.divider = document.createElement('div');

    this.listeners = {
      divider: new EventListener(this.divider, new EventManager(this)),
      document: new EventListener(this.element, new EventManager(this))
    };

    this.context = {
      x: 0,
      width: 0
    };
  }

  ngOnInit() {
    this.divider.classList.add(`${GRID_PREFIX}-divider`);
    this.element.appendChild(this.divider);
    this.listeners.divider.on('mousedown', this.start);
  }

  ngOnDestroy() {
    this.listeners.divider.off();
    this.listeners.document.off();
  }

  start(e) {
    e.preventDefault();

    const context = this.context;
    context.width = this.element.clientWidth;
    context.x = e.screenX;

    this.listeners.document.on('mousemove', this.drag);
    this.listeners.document.on('mouseup', this.dragEnd);

    const model = this.root.model;
    model.drag({isActive: true});
  }

  drag(e) {
    const model = this.root.model;
    const context = this.context;
    const layout = model.layout;
    const state = clone(layout()[this.resizePath]);
    state[this.key] = {width: context.width + e.screenX - context.x};
    layout({[this.resizePath]: state});
  }

  dragEnd() {
    this.listeners.document.off();

    const model = this.root.model;
    model.drag({isActive: false});
  }

  event() {
    const source = this.key;
    return {
      source,
      target: null
    };
  }
}

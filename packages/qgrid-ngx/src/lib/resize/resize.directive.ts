import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { clone, EventListener, EventManager, GRID_PREFIX } from '@qgrid/core';
import { Grid } from '../grid/grid';
import { GridModel } from '../grid/grid-model';
import { GridPlugin } from '../plugin/grid-plugin';

@Directive({
  selector: '[q-grid-resize]',
})
export class ResizeDirective implements OnInit, OnDestroy {
  private element: HTMLElement;
  private divider: HTMLElement;

  private listener: {
    divider: EventListener;
    document: EventListener;
  };

  private context = {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  };

  private get model(): GridModel {
    return this.plugin.model;
  }

  @Input('q-grid-resize') key?: string;
  @Input('q-grid-resize-path') path: string;
  @Input('q-grid-can-resize') canResize: (e: unknown) => boolean;
  @Input('q-grid-resize-selector') selector: string;

  constructor(
    private zone: NgZone,
    @Optional() private plugin: GridPlugin,
    private qgrid: Grid,
    @Inject(DOCUMENT) document: Document,
    elementRef: ElementRef,
  ) {
    this.element = elementRef.nativeElement;
    this.divider = document.createElement('div');

    this.listener = {
      divider: new EventListener(
        this.divider,
        new EventManager(this),
      ),

      document: new EventListener(
        document,
        new EventManager(this),
      ),
    };
  }

  ngOnInit() {
    const e = { data: this.key };
    if (this.canResize(e)) {
      this.zone.runOutsideAngular(() => {
        this.listener.divider.on('mousedown', this.dragStart);
      });

      this.divider.classList.add(`${GRID_PREFIX}-resize-handler`);
      this.element.appendChild(this.divider);
    }
  }

  ngOnDestroy() {
    this.listener.divider.off();
    this.listener.document.off();
  }

  dragStart(e: DragEvent) {
    e.preventDefault();

    const context = this.context;

    const host = this.select();
    context.width = host?.clientWidth as number;
    context.height = host?.clientHeight as number;
    context.x = e.screenX;
    context.y = e.screenY;

    this.zone.runOutsideAngular(() => {
      this.listener.document.on('mousemove', this.drag);
      this.listener.document.on('mouseup', this.dragEnd);
    });

    const model = this.model;
    model.drag({ isActive: true });
  }

  drag(e: MouseEvent) {
    const { context, path, key } = this;
    const { layout } = this.model;

    const state = clone(layout()[path as keyof typeof layout]);

    state.set(key, {
      width: context.width + e.screenX - context.x,
      height: context.height + e.screenY - context.y,
    });

    layout({ [path]: state });
  }

  dragEnd() {
    this.listener.document.off();

    const model = this.model;
    model.drag({ isActive: false });
  }

  private select(): HTMLElement | null {
    if (this.selector === 'parent') {
      return this.element.parentElement;
    }

    return this.element;
  }
}

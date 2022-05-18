import { Directive, ElementRef, Input, Optional } from '@angular/core';
import {
  Command,
  DragService,
  EventListener,
  EventManager,
  GRID_PREFIX,
  isFunction,
} from '@qgrid/core';
import { GridPlugin } from '../plugin/grid-plugin';

@Directive({
  selector: '[q-grid-drag]',
})
export class DragDirective {
  @Input('q-grid-drag-data') data: any;
  @Input('q-grid-drag-effect') effect: undefined | 'move';
  @Input('q-grid-drag') drag: Command;
  @Input('q-grid-drop-area') area: string;

  constructor(
    @Optional() private plugin: GridPlugin,
    private elementRef: ElementRef,
  ) {
    const element = elementRef.nativeElement;
    const listener = new EventListener(element, new EventManager(this));
    element.classList.add(`${GRID_PREFIX}-can-drag`);
    element.setAttribute('draggable', true);

    listener.on('dragstart', this.onStart);
    listener.on('dragend', this.onEnd);
  }

  onStart(e: DragEvent) {
    const transfer = e.dataTransfer;
    const data = this.data;
    const eventArg = { data };

    if (this.drag.canExecute(eventArg) === false) {
      e.preventDefault();
      transfer!.effectAllowed = 'none';
      return false;
    }

    const result = this.drag.execute(eventArg);
    DragService.element =
      result && isFunction(result.getBoundingClientRect)
        // tslint:disable-next-line: deprecation
        ? result : (e.srcElement || e.target);

    this.elementRef.nativeElement.classList.add(`${GRID_PREFIX}-drag`);

    transfer!.setData(DragService.mimeType, DragService.encode(data));
    transfer!.effectAllowed = this.effect || 'move';

    DragService.data = data;
    DragService.area = this.area;

    const rect = DragService.element.getBoundingClientRect();
    DragService.startPosition = {
      x: e.clientX,
      y: e.clientY,
      rect,
    };

    if (this.plugin) {
      const { model } = this.plugin;
      model.drag({ isActive: true }, { source: 'drag.directive' });
    }
  }

  onEnd() {
    if (this.plugin) {
      const { model } = this.plugin;
      model.drag({ isActive: false }, { source: 'drag.directive' });
    }

    this.elementRef.nativeElement.classList.remove(`${GRID_PREFIX}-drag`);

    DragService.data = null;
    // DragService.area = null;
    // DragService.element = null;
    // DragService.startPosition = null;
  }
}

import {Directive, ElementRef, Input, OnDestroy, OnInit, Optional} from "@angular/core";
import {EventListener, EventManager} from '@grid/core/infrastructure';
import {DragService} from './drag.service';
import {GRID_PREFIX} from '@grid/core/definition';
import {RootService} from "@grid/infrastructure/component";

@Directive({
  selector: '[q-grid-drag]'
})
export class DragDirective implements OnInit, OnDestroy {
  private element: HTMLElement;
  private listener;

  @Input('q-grid-drag') transfer;
  @Input('q-grid-drag-effect') effect;
  @Input('q-grid-can-drag') canDrag;

  constructor(@Optional() private root: RootService, elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
    this.listener = new EventListener(this.element, new EventManager(this));
  }

  ngOnInit() {
    this.element.classList.add(`${GRID_PREFIX}-can-drag`);
    this.listener.on('dragstart', this.start);
    this.listener.on('dragend', this.end);
  }

  ngOnDestroy() {
    this.element.classList.remove(`${GRID_PREFIX}-can-drag`);
    this.listener.off()
  }

  start(e) {
    const transfer = e.dataTransfer;
    if (this.canDrag(this.event()) === false) {
      e.preventDefault();
      transfer.effectAllowed = 'none';
      return false;
    }

    const source = this.transfer();
    this.element.classList.add(`${GRID_PREFIX}-drag`);
    transfer.setData(DragService.mimeType, DragService.encode(source));
    transfer.effectAllowed = this.effect || 'move';
    DragService.transfer = source;

    if (this.root) {
      const model = this.root.model;
      model.drag({isActive: true});
    }
  }

  end() {
    this.element.classList.remove(`${GRID_PREFIX}-drag`);
    DragService.transfer = null;

    if (this.root) {
      const model = this.root.model;
      model.drag({isActive: false});
    }
  }

  event() {
    const source = this.transfer()
    return {
      $event: {
        source: source,
        target: null
      }
    };
  }
}

import {Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output} from "@angular/core";
import {EventListener} from '@grid/core/infrastructure';
import {DragService} from './drag.service';
import {GRID_PREFIX} from '@grid/core/definition';
import {RootService} from "@grid/infrastructure/component";

@Directive({
  selector: '[q-grid-drop]'
})
export class DropDirective implements OnInit, OnDestroy {
  private element: HTMLElement;
  private listener;

  @Input('q-grid-drop') transfer;
  @Input('q-grid-drop-effect') effect;
  @Input('q-grid-can-drop') canDrop;
  @Output('q-grid-on-drop') onDrop = new EventEmitter<any>();

  constructor(@Optional() private root: RootService, elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
    this.listener = new EventListener(this, this.element);
  }

  ngOnInit() {
    this.element.classList.add(`${GRID_PREFIX}-can-drop`);
    this.listener.on('dragenter', this.enter);
    this.listener.on('dragover', this.over);
    this.listener.on('dragleave', this.leave);
    this.listener.on('drop', this.drop);
  }

  ngOnDestroy() {
    this.element.classList.remove(`${GRID_PREFIX}-can-drop`);
    this.listener.off();
  }

  drop(e) {
    e.stopPropagation();

    this.element.classList.remove(`${GRID_PREFIX}-dragover`);
    const event = this.event(e.dataTransfer)
    if (this.canDrop(event)) {
      this.onDrop.emit(event);
    }

    return false;
  }

  enter(e) {
    e.preventDefault();

    this.element.classList.add(`${GRID_PREFIX}-dragover`);
    e.dataTransfer.dropEffect = this.effect || 'move';
    return false;
  }

  over(e) {
    e.preventDefault();

    let effect = this.effect || 'move';
    if (this.element.classList.contains(`${GRID_PREFIX}-drag`) ||
      this.canDrop(this.event()) === false) {
      effect = 'none';
    }

    e.dataTransfer.dropEffect = effect;
    return false;
  }

  leave() {
    this.element.classList.remove(`${GRID_PREFIX}-dragover`);
  }

  event(e?) {
    const target = this.transfer();
    const source = arguments.length
      ? DragService.decode(e.getData(DragService.mimeType))
      : DragService.transfer;

    return {
      $event: {
        source: source,
        target: target
      }
    };
  }
}

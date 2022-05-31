import {
  Directive,
  Input,
  ElementRef,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { sizeFactory } from './vscroll.container';
import { VscrollPortYDirective } from './vscroll-port-y.directive';

@Directive({
  selector: '[q-grid-vscroll-row]',
})
export class VscrollRowDirective implements OnDestroy, OnChanges {
  private row: HTMLElement;

  private get layout() {
    return this.port.layout;
  }

  private get settings() {
    return this.port.context.settings;
  }

  private get container() {
    return this.port.context.container;
  }

  @Input('q-grid-vscroll-row') index: number;

  constructor(elementRef: ElementRef, private port: VscrollPortYDirective) {
    this.row = elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['index']) {
      if (this.port.getItemSize()) {
        // @ts-ignore: Type null is not assignable to type (changes: SimpleChanges) => void
        this.ngOnChanges = null;
        return;
      }

      const { layout, settings, container, row } = this;
      const { rowHeight } = settings;
      this.ngOnChanges = (e: SimpleChanges) => {
        if (e['index']) {
          const change = e['index'];
          const newIndex = change.currentValue;
          const oldIndex = change.previousValue;
          layout?.removeItem(oldIndex);

          const size = sizeFactory(rowHeight, container, row, newIndex);
          layout?.setItem(newIndex, size);
        }
      };

      const firstChange = changes['index'];
      const firstNewIndex = firstChange.currentValue;
      const firstSize = sizeFactory(rowHeight, container, row, firstNewIndex);
      layout?.setItem(firstNewIndex, firstSize);
    }
  }

  ngOnDestroy() {
    this.port.layout?.removeItem(this.index);
  }
}

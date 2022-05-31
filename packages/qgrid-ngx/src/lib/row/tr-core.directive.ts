import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Bag } from '@qgrid/core';
import { DomTr } from '../dom/dom';
import { GridLet } from '../grid/grid-let';
import { GridPlugin } from '../plugin/grid-plugin';

@Directive({
  selector: '[q-grid-core-tr]',
})
export class TrCoreDirective implements DomTr, OnInit, OnDestroy {
  @Input('q-grid-core-index') viewIndex: number;
  @Input('q-grid-core-tr') model: unknown;
  @Input('q-grid-core-source') source: string;

  element: HTMLElement;

  get index() {
    return this.$view.scroll.y.container.position + this.viewIndex;
  }

  constructor(
    public $view: GridLet,
    private plugin: GridPlugin,
    elementRef: ElementRef,
  ) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit() {
    this.plugin.table.box.bag[this.source as keyof { body: Bag; head: Bag; foot: Bag }].addRow(this);
  }

  ngOnDestroy() {
    this.plugin.table.box.bag[this.source as keyof { body: Bag; head: Bag; foot: Bag }].deleteRow(this);
  }
}

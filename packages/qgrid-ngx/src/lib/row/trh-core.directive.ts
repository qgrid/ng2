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
  selector: '[q-grid-core-trh]',
})
export class TrhCoreDirective implements DomTr, OnInit, OnDestroy {
  @Input('q-grid-core-index') index: number;
  @Input('q-grid-core-trh') model: any;
  @Input('q-grid-core-source') source: any;

  element: HTMLElement;

  constructor(
    public $view: GridLet,
    private plugin: GridPlugin,
    elementRef: ElementRef,
  ) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit() {
    this.plugin.table.box.bag[this.source as keyof { body: Bag; head: Bag; foot: Bag; }].addRow(this);
  }

  ngOnDestroy() {
    this.plugin.table.box.bag[this.source as keyof { body: Bag; head: Bag; foot: Bag; }].deleteRow(this);
  }
}

import {Directive, ElementRef} from '@angular/core';
//import cellBuilder from '../cell/cell.build';
import {VIEW_CORE_NAME, TH_CORE_NAME,} from 'ng/definition';
import {GRID_PREFIX} from 'core/definition';
import {ViewCoreComponent} from "../view/view-core.component";

@Directive({
  selector: '[q-grid-core-th]'
})
export class ThCoreDirective {
  private element: HTMLElement = null;

  constructor(private view: ViewCoreComponent, element: ElementRef) {
    this.element = element.nativeElement;
  }

  onInit() {
    const column = this.column;
    const element = this.element;

    // element.classList.add(`${GRID_PREFIX}-${column.key}`);
    // element.classList.add(`${GRID_PREFIX}-${column.type}`);
    // if (column.hasOwnProperty('editor')) {
    // 	element.classList.add(`${GRID_PREFIX}-${column.editor}`);
    // }

    // if (this.$attrs[TH_CORE_NAME] !== 'body') {
    // 	const model = this.view.model;
    // 	const cache = model.head().cache;
    // 	let link = cache.find(column.key);
    // 	if (!link) {
    // 		const build = cellBuilder(this.view.template);
    // 		link = build('head', model, this.column);
    // 		cache.set(column.key, link);
    // 	}
    //
    // 	link(this.$element, this.$scope);
    // }
  }

  get column() {
    return null;
    //return this.$scope.$column.model;
  }
}

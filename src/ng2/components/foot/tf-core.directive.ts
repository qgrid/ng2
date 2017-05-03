import {Directive, ElementRef} from '@angular/core';
//import cellBuilder from '../cell/cell.build';
import {VIEW_CORE_NAME, TF_CORE_NAME} from 'ng/definition';
import {GRID_PREFIX} from 'core/definition';
import {ViewCoreComponent} from "../view/view-core.component";

@Directive({
  selector: '[q-grid-core-tf]'
})
export class TfCoreDirective {
  private element: HTMLElement = null;

  constructor(private view: ViewCoreComponent, element: ElementRef) {
    this.element = element.nativeElement;
  }

  onInit() {
    const column = this.column;
    const element = this.element;

    element.classList.add(`${GRID_PREFIX}-${column.key}`);
    element.classList.add(`${GRID_PREFIX}-${column.type}`);
    if (column.hasOwnProperty('editor')) {
      element.classList.add(`${GRID_PREFIX}-${column.editor}`);
    }

    // const model = this.view.model;
    // const cache = model.foot().cache;
    // const rowIndex = this.rowIndex;
    // const key = rowIndex > 0 ? column.key + rowIndex : column.key;
    // let link = cache.find(key);
    // if (!link) {
    // 	const build = cellBuilder(this.view.template);
    // 	link = build('foot', this.view.model, this.column);
    // 	cache.set(key, link);
    // }
    //
    // link(this.$element, this.$scope);const model = this.view.model;
    // const cache = model.foot().cache;
    // const rowIndex = this.rowIndex;
    // const key = rowIndex > 0 ? column.key + rowIndex : column.key;
    // let link = cache.find(key);
    // if (!link) {
    // 	const build = cellBuilder(this.view.template);
    // 	link = build('foot', this.view.model, this.column);
    // 	cache.set(key, link);
    // }
    //
    // link(this.$element, this.$scope);
  }

  get value() {
    const column = this.column;
    return this.view.foot.value(column);
  }

  get rowIndex() {
    return 0;
    //return this.$scope.$parent.$index;
  }

  get column() {
    return null;
    //return this.$scope.$column.model;
  }
}

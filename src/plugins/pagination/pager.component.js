import {Component} from "@angular/core/@angular/core";
import {Command} from '@grid/core/infrastructure';
import {TemplatePath} from '@grid/core/template';

@Component({
  selector: 'q-grid-pager',
  template: require('./pager.component.html')
})
export class Pager implements OnInit {
  constructor() {
    this.next = new Command({
      execute: () => this.current = this.current + 1,
      canExecute: () => (this.current + 1) * this.size < this.total
    });

    this.prev = new Command({
      execute: () => this.current = this.current - 1,
      canExecute: () => this.current > 0
    });
  }


  get size() {
    return this.model.pagination().size;
  }

  set size(value) {
    this.model.pagination({size: value, current: 0});
  }

  get sizeList() {
    return this.model.pagination().sizeList;
  }

  get current() {
    return this.model.pagination().current;
  }

  set current(value) {
    return this.model.pagination({current: value});
  }

  get from() {
    return Math.min(this.total, this.current * this.size + 1);
  }

  get to() {
    return Math.min(this.total, (this.current + 1) * this.size);
  }

  get total() {
    return this.model.pagination().count;
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.total / this.size));
  }

  get scroll() {
    return this.model.scroll();
  }

  get model(){

  }

}

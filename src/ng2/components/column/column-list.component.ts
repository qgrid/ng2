import {Component, Input, Output, ElementRef} from '@angular/core';
import {ModelComponent} from '../model.component';
import {GridComponent} from '../grid/grid.component';

@Component({
  selector: 'q-grid-columns',
  template: ''
})
export class ColumnListComponent extends ModelComponent {
  protected names = ['columnList'];
  @Input('generation') columnListGeneration: string = null;

  constructor(root: GridComponent) {
    super(root);
  }
}

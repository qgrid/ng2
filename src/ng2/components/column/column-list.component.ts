import {Component, Input} from '@angular/core';
import {ModelComponent} from '../model.component';
import {RootService} from "../root.service";

@Component({
  selector: 'q-grid-columns',
  template: ''
})
export class ColumnListComponent extends ModelComponent {
  protected names = ['columnList'];
  @Input('generation') columnListGeneration: string = null;

  constructor(root: RootService) {
    super(root);
  }
}

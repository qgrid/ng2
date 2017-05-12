import {Component, Input} from '@angular/core';
import {ModelComponent} from '../../model.component';
import {RootService} from '../../root.service';

@Component({
  selector: 'q-grid-columns',
  template: ''
})
export class ColumnListComponent extends ModelComponent {
  @Input('generation') public columnListGeneration: string = null;

  constructor(root: RootService) {
    super(root);

    this.models = ['columnList'];
  }
}

import {Component, Input} from '@angular/core';
import {ModelComponent} from '@grid/infrastructure/component/model.component';
import {RootService} from '@grid/infrastructure/component/root.service';

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

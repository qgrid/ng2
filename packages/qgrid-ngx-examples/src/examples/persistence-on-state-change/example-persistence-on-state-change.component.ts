import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { PersistenceStorage } from 'ng2-qgrid';

const EXAMPLE_TAGS = ['persistence-on-state-change', 'Grid state is saved on model change'];

@Component({
  selector: 'example-persistence-on-state-change',
  templateUrl: 'example-persistence-on-state-change.component.html',
  styleUrls: ['example-persistence-on-state-change.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplePersistenceOnStateChangeComponent {
  static tags = EXAMPLE_TAGS;
  title = EXAMPLE_TAGS[1];

  rows$ = this.dataService.getAtoms();
  storage = new PersistenceStorage(sessionStorage);

  constructor(private dataService: DataService) {
  }
}

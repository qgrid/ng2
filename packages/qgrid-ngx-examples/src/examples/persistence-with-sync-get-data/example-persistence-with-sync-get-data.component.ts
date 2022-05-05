import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';


const EXAMPLE_TAGS = ['persistence-with-sync-get-data', 'Persistence plugin when rows are defined in sync manner'];

@Component({
  selector: 'example-persistence-with-sync-get-data',
  templateUrl: 'example-persistence-with-sync-get-data.component.html',
  styleUrls: ['example-persistence-with-sync-get-data.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplePersistenceWithSyncGetDataComponent {
  static tags = EXAMPLE_TAGS;
  title = EXAMPLE_TAGS[1];

  rows = [ { column1: 1, column2: 'a' }, { column1: 2, column2: 'b' } ];
}

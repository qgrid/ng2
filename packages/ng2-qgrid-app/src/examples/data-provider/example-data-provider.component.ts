import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Atom, DataService } from '../data.service';
import { GridModel } from '@qgrid/ngx/src/lib/grid/grid-model';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
  'data-provider-basic',
  'Data provider demonstration. All actions are performed on server side'
];

@Component({
  selector: 'example-data-provider',
  templateUrl: 'example-data-provider.component.html',
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDataProviderComponent {
  static tags = EXAMPLE_TAGS;
  title = EXAMPLE_TAGS[1];

  $rows: Observable<Atom[]>;

  constructor(private cdr: ChangeDetectorRef,
              private dataService: DataService) {
  }

  onRequestData(model: GridModel): void {
    this.$rows = this.dataService.getAtoms();
  }
}

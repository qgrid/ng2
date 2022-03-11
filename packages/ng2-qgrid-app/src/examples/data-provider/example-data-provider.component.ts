import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridModel } from '@qgrid/ngx/src/lib/grid/grid-model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Atom, DataService } from '../data.service';

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

  constructor(private dataService: DataService) {
  }

  onRequestData(model: GridModel): void {
    const pager = model.pagination();

    this.$rows = this.dataService.getAtoms().pipe(
      tap((res) => model.pagination({ count: res.length })),
      map((res) => res.splice(pager.current * pager.size, pager.size))
    );
	}
}

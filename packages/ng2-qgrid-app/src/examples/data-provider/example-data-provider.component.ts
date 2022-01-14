import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Atom, DataService } from '../data.service';
import { GridModel } from '@qgrid/ngx/src/lib/grid/grid-model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
    const pager = model.pagination(),
          sorter = model.sort();

    this.$rows = this.dataService.getAtoms().pipe(
      tap((res) => model.pagination({
        count: res.length
      })),
      map((res) => res.sort(this.sortData(sorter.by))),
      map((res) => res.splice(pager.current * pager.size, pager.size))
    );
  }

  sortData(sortList: any[]) {
    return (a: Atom, b: Atom) => {

      if (sortList.length) {
        for (let i = 0; i < sortList.length; i++) {
          const sorter = sortList[i];

          for (const key in sorter) {
            const direction = sorter[key] !== 'asc' ? -1 : 1,
              aValue = a[key], bValue = b[key];

            if (typeof aValue === 'number') {
              return sorter[key] !== 'asc' ? aValue - bValue : bValue - aValue;
            }

            if (aValue < bValue) {
              return direction;
            }

            if (aValue > bValue) {
              return direction;
            }
          }

        }
      }

      return 0;
    };
  }
}

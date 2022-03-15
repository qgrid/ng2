import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Grid } from 'ng2-qgrid';
import { Subject } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
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

	gridModel = this.qgrid.model();

  $rows: Subject<Atom[]> = new Subject();

  constructor(
		private dataService: DataService,
		private qgrid: Grid,
		private cd: ChangeDetectorRef,
	) {
	}

  onRequestRows(rows: Atom[]): void {
    const pager = this.gridModel.pagination();

    this.dataService.getAtoms()
			.pipe(
				tap(atoms => this.gridModel.pagination({ count: atoms.length })),
				map(atoms => atoms.splice(pager.current * pager.size, pager.size)),
				finalize(() => this.cd.detectChanges()),
			).subscribe(atoms => this.$rows.next(atoms));
	}
}

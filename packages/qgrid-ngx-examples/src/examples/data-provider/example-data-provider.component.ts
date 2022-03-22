import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	CacheAlreadyRequestedPageStrategy, DataProvider, DataProviderServer, Grid, GridModel, RequestCountOnceStrategy, ReverseDataStrategy
} from 'ng2-qgrid';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  page$: Observable<Atom[]>;

	dataProvider: DataProvider<Atom>;
	gridModel: GridModel;

  constructor(
		private dataService: DataService,
		private qgrid: Grid,
	) {
		const server = new FakeServer(this.dataService);
		this.gridModel = this.qgrid.model();
	
		this.dataProvider = new DataProvider<Atom>([
			RequestCountOnceStrategy,
			CacheAlreadyRequestedPageStrategy,
			ReverseDataStrategy,
		], { server, gridModel: this.gridModel, pageSize: 50 });
	}

  onRequestRows(gridModel: GridModel): void {
		this.page$ = this.dataProvider.getPage(gridModel.pagination().current);
	}
}

class FakeServer implements DataProviderServer<Atom> {
	constructor(
		private dataService: DataService,
	) { }

	getPage(pageNumber: number, pageSize: number): Observable<Atom[]> {
		return this.dataService.getAtoms()
			.pipe(map(atoms => atoms.splice(pageNumber * pageSize, pageSize)));
	}

	getTotal(): Observable<number> {
		return this.dataService.getAtoms()
			.pipe(map(atoms => atoms.length));
	}
}
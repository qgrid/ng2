import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	CacheAlreadyRequestedPageStrategy, DataProvider, DataProviderServer, DataProviderStrategy, Grid, GridModel, RequestTotalCountOnceStategy
} from 'ng2-qgrid';
import { Observable, of } from 'rxjs';
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
	gridModel = this.qgrid.model();

  constructor(
		private dataService: DataService,
		private qgrid: Grid,
	) {
		const server = new FakeServer(this.dataService);
	
		this.dataProvider = new DataProvider<Atom>(this.gridModel, [
			new RequestTotalCountOnceStategy(server),
			new CacheAlreadyRequestedPageStrategy(server, 2),
			new ReverseDataStrategy(),
		]);
	}

  onRequestRows(gridModel: GridModel): void {
		this.page$ = this.dataProvider.getPage();
	}
}

class FakeServer implements DataProviderServer<Atom> {
	constructor(
		private dataService: DataService,
	) { }

	getPage(number: number, pageSize: number): Observable<Atom[]> {
		return this.dataService.getAtoms()
			.pipe(map(atoms => atoms.splice(number * pageSize, pageSize)));
	}

	getTotal(): Observable<number> {
		return this.dataService.getAtoms()
			.pipe(map(atoms => atoms.length));
	}
}

class ReverseDataStrategy<T> extends DataProviderStrategy<T> {
	processData(memo: T[]): Observable<T[]> {
		return of(memo.slice().reverse());
	}
}
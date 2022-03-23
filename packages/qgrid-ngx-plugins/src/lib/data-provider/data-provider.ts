import { GridModel } from '@qgrid/ngx';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataProviderStrategy } from './data-provider-strategy';

export class DataProvider<T> {

	constructor(
		private gridModel: GridModel,
		private strategies: DataProviderStrategy<T>[],
	) {
		strategies.forEach(strategy => strategy.setGridModel(this.gridModel));
	}

	getPage(): Observable<T[]> {
		return this.applyStrategies();
	}

	private applyStrategies(memo = [], index = 0): Observable<T[]> {
		const strategy = this.strategies[index];
		const hasNext = !!this.strategies[index + 1];
		if (!strategy) {
			return of(memo);
		}
		return strategy.processData(memo)
			.pipe(switchMap(x => hasNext ? this.applyStrategies(x, index + 1) : of(x)));
	}
}
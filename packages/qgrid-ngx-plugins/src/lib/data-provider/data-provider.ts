import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataProviderStrategy } from './data-provider-strategy';
import { DataProviderOptions } from './models';

export class DataProvider<T> {
	private strategies: DataProviderStrategy<T>[] = [];

	constructor(
		private strategiesTypes: typeof DataProviderStrategy[],
		private options: DataProviderOptions<T>
	) {
		this.strategies = this.createStrategies(this.strategiesTypes);
		this.options = { pageSize: 10, ...this.options };
	}

	getPage(page: number, size?: number): Observable<T[]> {
		size = size || this.options.pageSize;
		return this.applyStrategies(page, size);
	}

	getTotal(): Observable<number> {
		return this.options.server.getTotal();
	}

	private applyStrategies(page: number, size: number, memo = [], index: number = 0): Observable<T[]> {
		if (!this.strategies[index]) {
			return of();
		}
		return this.strategies[index].processData(memo, page, size)
			.pipe(switchMap(x =>
				this.strategies[index + 1] ?
					this.applyStrategies(page, size, x, index + 1) :
					of(x)
			));
	}

	private createStrategies(types: typeof DataProviderStrategy[]): DataProviderStrategy<T>[] {
		return types.map(strategy => (
			new strategy<T>()
				.setServer(this.options.server)
				.setGridModel(this.options.gridModel)
		));
	}
}
import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { DataProviderStrategy } from '../data-provider-strategy';
import { DataProviderServer } from '../models';

export class CacheAlreadyRequestedPageStrategy<T> extends DataProviderStrategy<T> {
	private gridRowsCache: Map<number, T[]> = new Map();

	constructor(
		private server: Pick<DataProviderServer<T>, 'getPage'>,
		private pagesToLoad: number = 0,
	) {
		super();
	}

	processData(memo: T[]): Observable<T[]> {
		const { current, size } = this.gridModel.pagination();

		if (this.pagesToLoad) {
			this.loadInBackground(this.pagesToLoad);
		}

		if (this.gridRowsCache.has(current)) {
			return of(this.gridRowsCache.get(current));
		}

		const shouldRequestData = !memo?.length;
		return (shouldRequestData ? this.server.getPage(current, size) : of(memo))
			.pipe(tap(rows => this.gridRowsCache.set(current, rows)));
	}

	private loadInBackground(pagesToLoad: number): void {
		const { current, size } = this.gridModel.pagination();
		const fromPage = current + 1;
		const toPage = current + pagesToLoad;
		for (let page = fromPage; page <= toPage; page++) {
			if (!this.gridRowsCache.has(page)){
				this.server.getPage(page, size)
					.pipe(filter(rows => !!rows?.length))
					.subscribe(rows => this.gridRowsCache.set(page, rows));
			}
		}		
	}
}
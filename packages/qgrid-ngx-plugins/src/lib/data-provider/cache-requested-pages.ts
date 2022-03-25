import { GridModel } from '@qgrid/ngx';
import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { DataProviderPageServer } from './data-provider-page-server';
import { DataProviderProcessContext } from './data-provider-process-context';
import { DataProviderStrategy } from './data-provider-strategy';

export class CacheAlreadyRequestedPageStrategy<T> implements DataProviderStrategy<T> {
	private gridRowsCache: Map<number, T[]> = new Map();

	constructor(
		private server: Pick<DataProviderPageServer<T>, 'getPage'>,
		private pagesToLoad: number = 0,
	) { }

	process(memo: T[], { model }: DataProviderProcessContext): Observable<T[]> {
		const { current, size } = model.pagination();

		if (this.pagesToLoad) {
			this.loadInBackground(this.pagesToLoad, model);
		}

		if (this.gridRowsCache.has(current)) {
			return of(this.gridRowsCache.get(current));
		}

		const shouldRequestData = !memo?.length;
		return (shouldRequestData ? this.server.getPage(current, size) : of(memo))
			.pipe(tap(rows => this.gridRowsCache.set(current, rows)));
	}

	private loadInBackground(pagesToLoad: number, model: GridModel): void {
		const { count, current, size } = model.pagination();
		const fromPage = current + 1;
		const toPage = current + pagesToLoad;
		const maxPage = Math.floor(count / size); 
		for (let page = fromPage; page <= toPage; page++) {
			if (page <= maxPage && !this.gridRowsCache.has(page)){
				this.server.getPage(page, size)
					.pipe(filter(rows => !!rows?.length))
					.subscribe(rows => this.gridRowsCache.set(page, rows));
			}
		}		
	}
}
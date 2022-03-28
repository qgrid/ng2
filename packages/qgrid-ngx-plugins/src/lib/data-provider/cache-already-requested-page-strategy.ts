import { GridModel } from '@qgrid/ngx';
import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { DataProviderContext } from './data-provider';
import { DataProviderPageServer } from './data-provider-page-server';
import { DataProviderStrategy } from './data-provider-strategy';

export class CacheAlreadyRequestedPageStrategy<T> implements DataProviderStrategy<T> {
	private pageCache: Map<number, T[]> = new Map();

	constructor(
		private server: Pick<DataProviderPageServer<T>, 'getPage'>,
		private options: { pagesToLoad: number } = { pagesToLoad: 0 },
	) { }

	process(data: T[], { model }: DataProviderContext): Observable<T[]> {
		const { current, size } = model.pagination();

		if (this.options.pagesToLoad) {
			this.loadInBackground(this.options.pagesToLoad, model);
		}

		if (this.pageCache.has(current)) {
			return of(this.pageCache.get(current));
		}

		const shouldRequestData = !data.length;
		return (shouldRequestData ? this.server.getPage(current, size) : of(data))
			.pipe(tap(rows => this.pageCache.set(current, rows)));
	}

	private loadInBackground(pagesToLoad: number, model: GridModel): void {
		const { count, current, size } = model.pagination();
		const fromPage = current + 1;
		const toPage = current + pagesToLoad;
		const maxPage = Math.floor(count / size); 
		for (let page = fromPage; page <= toPage; page++) {
			if (page <= maxPage && !this.pageCache.has(page)){
				this.server.getPage(page, size)
					.pipe(filter(rows => !!rows?.length))
					.subscribe(rows => this.pageCache.set(page, rows));
			}
		}		
	}
}
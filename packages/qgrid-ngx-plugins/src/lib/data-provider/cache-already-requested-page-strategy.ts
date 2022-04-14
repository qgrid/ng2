import { GridModel } from '@qgrid/ngx';
import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { DataProviderContext } from './data-provider';
import { DataProviderPageServer } from './data-provider-page-server';
import { DataProviderStrategy } from './data-provider-strategy';

export class CacheAlreadyRequestedPageStrategy<T> implements DataProviderStrategy<T> {
	private pageCache: Map<number, T[]> = new Map();
	private pagerSize: number;

	constructor(
		private server: Pick<DataProviderPageServer<T>, 'getRecords'>,
		private options: { pagesToLoad: number } = { pagesToLoad: 1 },
	) { }

	process(data: T[], { model }: DataProviderContext): Observable<T[]> {
		const { current, size } = model.pagination();

		if (this.options.pagesToLoad) {
			this.loadBackgroundPages(this.options.pagesToLoad, model);
		}

		if (this.pageCache.has(current)) {
			return of(this.pageCache.get(current));
		}

		const shouldRequestData = !data.length;
		return (shouldRequestData ? this.server.getRecords(current * size, (current + 1) * size) : of(data))
			.pipe(tap(rows => this.pageCache.set(current, rows)));
	}

	invalidate(gridModel: GridModel): void {
		const { size } = gridModel.pagination();
		if (this.pagerSize !== size) {
			this.pageCache.clear();
			this.pagerSize = size;
		}
	}

	private loadBackgroundPages(pagesToLoad: number, model: GridModel): void {
		const { count, current, size } = model.pagination();
		const fromPage = current + 1;
		const toPage = current + pagesToLoad;
		const maxPage = Math.floor(count / size); 
		for (let page = fromPage; page < toPage; page++) {
			if (page <= maxPage && !this.pageCache.has(page)) {
				this.server.getRecords(page * size, (page + 1) * size)
					.pipe(filter(rows => !!rows?.length))
					.subscribe(rows => this.pageCache.set(page, rows));
			}
		}		
	}
}
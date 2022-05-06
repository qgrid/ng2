import { GridModel } from '@qgrid/ngx';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataProviderContext } from './data-provider';
import { DataProviderPageServer } from './data-provider-page-server';
import { DataProviderStrategy } from './data-provider-strategy';

export class CheckNextPageCountStrategy<T> implements DataProviderStrategy<T> {
	private cache: Set<number> = new Set();
	private pagerSize: number;

	constructor(
		private server: Pick<DataProviderPageServer<T>, 'getRecords'>,
	) { }

	process(data: T[], { model }: DataProviderContext): Observable<T[]> {
		const { current } = model.pagination();

		if (this.cache.has(current)) {
			return of(data);
		}
		
		const { count, size } = model.pagination();
		return this.server.getRecords(current * size, (current + 1) * size + 1)
			.pipe(
				map((next: T[]) => {
					if (next?.length > size) {
						next.pop();
					}
					model.pagination({ count: next.length + (count || 1) });
					this.cache.add(current);
					return next;
				}),
			);
	}

	invalidate(gridModel: GridModel): void {
		const { size } = gridModel.pagination();
		if (size !== this.pagerSize) {
			this.cache.clear();
			gridModel.pagination({ count: 0 });
			this.pagerSize = size;
		}
	}
} 
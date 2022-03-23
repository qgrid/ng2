import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataProviderStrategy } from '../data-provider-strategy';
import { DataProviderServer } from '../models';

export class CacheAlreadyRequestedPageStrategy<T> extends DataProviderStrategy<T> {
	private gridRowsCache: Map<number, T[]> = new Map();

	constructor(
		private server: Pick<DataProviderServer<T>, 'getPage'>,
	) {
		super();
	}

	processData(memo: T[]): Observable<T[]> {
		const { current, size } = this.gridModel.pagination();

		if (this.gridRowsCache.has(current)) {
			return of(this.gridRowsCache.get(current));
		}

		const shouldRequestData = !memo?.length;
		return (shouldRequestData ? this.server.getPage(current, size) : of(memo))
			.pipe(tap(rows => this.gridRowsCache.set(current, rows)));
	}
}
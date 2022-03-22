import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataProviderStrategy } from '../data-provider-strategy';


export class CacheAlreadyRequestedPageStrategy<T> extends DataProviderStrategy<T> {
	private gridRowsCache: Map<number, T[]> = new Map();

	processData(memo: T[], page?: number, size?: number): Observable<T[]> {
		if (this.gridRowsCache.has(page)) {
			return of(this.gridRowsCache.get(page));
		}

		const shouldRequestData = !memo?.length;
		return (shouldRequestData ? this.server.getPage(page, size) : of(memo))
			.pipe(tap(rows => this.gridRowsCache.set(page, rows)));
	}
}
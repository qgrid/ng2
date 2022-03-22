import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DataProviderStrategy } from '../data-provider-strategy';


export class RequestCountOnceStrategy<T> extends DataProviderStrategy<T> {
	private totalCount: number = 0;

	processData(memo: T[]): Observable<T[]> {
		if (this.totalCount > 0) {
			this.setPaginationCount(this.totalCount);
			return of(memo);
		}
		return this.server.getTotal()
			.pipe(
				tap(count => {
					this.totalCount = count;
					this.setPaginationCount(count);
				}),
				switchMap(() => of(memo))
			)
	}

	private setPaginationCount(count: number): void {
		this.gridModel.pagination({ count });
	}
}
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DataProviderStrategy } from '../data-provider-strategy';
import { DataProviderServer } from '../models';


export class RequestTotalCountOnceStategy<T> extends DataProviderStrategy<T> {
	private totalCount: number = 0;

	constructor(
		private server: Pick<DataProviderServer<T>, 'getTotal'>,
	) {
		super();
	}

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
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DataProviderContext } from './data-provider';
import { DataProviderPageServer } from './data-provider-page-server';
import { DataProviderStrategy } from './data-provider-strategy';

export class RequestTotalCountOnceStategy<T> implements DataProviderStrategy<T> {
	private totalCount: number = 0;

	constructor(
		private server: Pick<DataProviderPageServer<T>, 'getTotal'>,
	) { }

	process(data: T[], { model }: DataProviderContext): Observable<T[]> {
		if (this.totalCount > 0) {
			model.pagination({ count: this.totalCount });
			return of(data);
		}
	
		return this.server.getTotal()
			.pipe(
				tap(count => {
					this.totalCount = count;
					model.pagination({ count });
				}),
				switchMap(() => of(data))
			)
	}
}
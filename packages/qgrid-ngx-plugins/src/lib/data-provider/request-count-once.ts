import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DataProviderPageServer } from './data-provider-page-server';
import { DataProviderProcessContext } from './data-provider-process-context';
import { DataProviderStrategy } from './data-provider-strategy';

export class RequestTotalCountOnceStategy<T> implements DataProviderStrategy<T> {
	private totalCount: number = 0;

	constructor(
		private server: Pick<DataProviderPageServer<T>, 'getTotal'>,
	) { }

	process(memo: T[], { model }: DataProviderProcessContext): Observable<T[]> {
		if (this.totalCount > 0) {
			model.pagination({ count: this.totalCount });
			return of(memo);
		}
	
		return this.server.getTotal()
			.pipe(
				tap(count => {
					this.totalCount = count;
					model.pagination({ count });
				}),
				switchMap(() => of(memo))
			)
	}
}
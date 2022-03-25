import { Observable } from 'rxjs';
import { DataProviderProcessContext } from './data-provider-process-context';

export interface DataProviderStrategy<T> {
	process(memo: T[], context: DataProviderProcessContext): Observable<T[]>;
}
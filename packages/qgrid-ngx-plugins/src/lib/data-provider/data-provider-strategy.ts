import { Observable } from 'rxjs';
import { DataProviderContext } from './data-provider';

export interface DataProviderStrategy<T> {
	process(data: T[], context: DataProviderContext): Observable<T[]>;
}
import { Observable, of } from 'rxjs';
import { DataProviderStrategy } from '../data-provider-strategy';


export class ReverseDataStrategy<T> extends DataProviderStrategy<T> {
	processData(data: T[]): Observable<T[]> {
		return of(data.slice().reverse());
	}
}
import { Observable } from 'rxjs';

export interface DataProviderPageServer<T> {
	getRecords(from: number, to: number): Observable<T[]>;
	getTotal(): Observable<number>;
}
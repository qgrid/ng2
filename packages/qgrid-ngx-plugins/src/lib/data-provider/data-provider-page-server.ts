import { Observable } from 'rxjs';

export interface DataProviderPageServer<T> {
	getPage(page?: number, size?: number): Observable<T[]>;
	getTotal(): Observable<number>;
}
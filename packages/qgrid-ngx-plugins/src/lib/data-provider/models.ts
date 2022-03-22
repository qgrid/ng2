import { GridModel } from '@qgrid/ngx';
import { Observable } from 'rxjs';

export interface DataProviderOptions<T> {
	server: DataProviderServer<T>;
	gridModel: GridModel,
	pageSize?: number;
}

export interface DataProviderServer<T> {
	getPage(page: number, size: number): Observable<T[]>;
	getTotal(): Observable<number>;
}
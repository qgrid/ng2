import { GridModel } from '@qgrid/ngx';
import { Observable } from 'rxjs';
import { DataProviderContext } from './data-provider';

export interface DataProviderStrategy<T> {
	process(data: T[], context: DataProviderContext): Observable<T[]>;
	invalidate?(gridModel: GridModel): void;
}
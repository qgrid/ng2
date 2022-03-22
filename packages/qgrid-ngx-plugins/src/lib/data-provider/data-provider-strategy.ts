import { GridModel } from '@qgrid/ngx';
import { Observable, of } from 'rxjs';
import { DataProviderServer } from './models';

export class DataProviderStrategy<T> {
	protected server: DataProviderServer<T>;
	protected gridModel: GridModel;

	processData(memo: T[], page?: number, size?: number): Observable<T[]> {
		return of(memo);
	}
	
	setServer(server: DataProviderServer<T>): DataProviderStrategy<T> {
		this.server = server;
		return this;
	}

	setGridModel(model: GridModel): DataProviderStrategy<T> {
		this.gridModel = model;
		return this;
	}
}
import { GridModel } from '@qgrid/ngx';
import { Observable } from 'rxjs';

export abstract class DataProviderStrategy<T> {
	protected gridModel: GridModel;

	abstract processData(memo: T[]): Observable<T[]>;

	setGridModel(model: GridModel): DataProviderStrategy<T> {
		this.gridModel = model;
		return this;
	}
}
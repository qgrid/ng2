import { Injectable } from '@angular/core';
import { ColumnModel } from '@qgrid/core/column-type/column.model';

@Injectable()
export class ColumnService {
	column: ColumnModel;
}

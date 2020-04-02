import { Injectable } from '@angular/core';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';

@Injectable()
export class ColumnService {
	column: ColumnModel;
}

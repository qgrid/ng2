import { Injectable, Optional, SkipSelf } from "@angular/core";
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';

@Injectable()
export class ColumnService {
	constructor(@SkipSelf() @Optional() public parent: ColumnService) {
	}

	column: ColumnModel;
}

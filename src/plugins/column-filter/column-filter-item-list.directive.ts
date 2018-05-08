import { Directive, Input } from '@angular/core';
import { CellService } from 'ng2-qgrid/main/core/cell/cell.service';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';

@Directive({
	selector: '[q-grid-column-filter-item-list]',
	providers: [CellService]
})
export class ColumnFilterItemListDirective {
	@Input('q-grid-column-filter-item-list') column: ColumnModel;

	constructor(
		public cellService: CellService
	) {
	}
}

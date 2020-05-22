import { Directive, Input } from '@angular/core';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { CellTemplateService } from '@qgrid/ngx';

@Directive({
	selector: '[q-grid-column-filter-item-list]',
	providers: [CellTemplateService]
})
export class ColumnFilterItemListDirective {
	@Input('q-grid-column-filter-item-list') column: ColumnModel;
	@Input('q-grid-column-filter-search') search: string;

	constructor(
		public cellService: CellTemplateService
	) {
	}
}

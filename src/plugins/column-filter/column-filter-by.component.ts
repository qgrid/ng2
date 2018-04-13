import { Component, Input, Optional } from '@angular/core';
import { PluginComponent } from 'ng2-qgrid/plugins/plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';

@Component({
	selector: 'q-grid-column-filter-by',
	templateUrl: './column-filter-by.component.html'
})
export class ColumnFilterByComponent extends PluginComponent {
	@Input() public by: Set<string>;

	constructor(@Optional() root: RootService) {
		super(root);
	}

	remove(item: string): void {
		this.by.delete(item);
	}
}

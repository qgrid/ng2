import {Component, Input, OnInit, Optional} from '@angular/core';
import { PluginComponent } from 'ng2-qgrid/plugins/plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { ColumnFilterView } from 'ng2-qgrid/plugin/column-filter/column.filter.view';

@Component({
	selector: 'q-grid-chip',
	templateUrl: './chip.component.html'
})
export class ChipComponent extends PluginComponent implements OnInit {
	@Input() public by: Set<string>;
	@Input() public item: string;

	private visibility;

	constructor(@Optional() root: RootService) {
		super(root);
	}

	ngOnInit() {
		this.visibility = this.by.has(this.item);
	}

	close(): void {
		this.by.delete(this.item);
	}
}

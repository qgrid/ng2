import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { PluginComponent } from 'ng2-qgrid/plugins/plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';

@Component({
	selector: 'q-grid-column-filter-by',
	templateUrl: './column-filter-by.component.html'
})
export class ColumnFilterByComponent extends PluginComponent {
	@Input() by: Set<string>;
	@Input() column: ColumnModel;
	@Input() byBlanks: boolean;

	@Output() byBlanksChange = new EventEmitter();

	constructor(@Optional() root: RootService) {
		super(root);
	}

	get isBlanks() {
		return this.byBlanks;
	}

	remove(item: string): void {
		if (item) {
			this.by.delete(item);
		} else {
			this.byBlanksChange.emit(false);
		}
	}
}

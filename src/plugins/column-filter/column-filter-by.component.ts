import {Component, DoCheck, EventEmitter, Input, OnChanges, Optional, Output, SimpleChanges} from '@angular/core';
import { PluginComponent } from 'ng2-qgrid/plugins/plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';

const Blanks = '(Blanks)';

@Component({
	selector: 'q-grid-column-filter-by',
	templateUrl: './column-filter-by.component.html'
})
export class ColumnFilterByComponent extends PluginComponent implements OnChanges, DoCheck {
	@Input() by: Set<string>;
	@Input() byBlanks: boolean;
	@Input() column: ColumnModel;

	@Output() removeBlanks = new EventEmitter<any>();

	constructor(@Optional() root: RootService) {
		super(root);
	}

	ngOnChanges(changes: SimpleChanges) {
		const temp = 123;
		switch (changes.byBlanks.currentValue) {
			case (true): {
				this.by.add(Blanks);
				break;
			}
			case (false): {
				if (this.by.has(Blanks)) {
					this.by.delete(Blanks);
				}
			}
		}
	}

	ngDoCheck() {
		const temp = 123;
	}

	remove(item: string): void {
		if (item === Blanks) {
			this.removeBlanks.emit();
		}
		this.by.delete(item);
	}
}

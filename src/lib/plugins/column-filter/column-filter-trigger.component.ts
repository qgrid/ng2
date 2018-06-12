import { Component, Input, Optional, OnInit, ElementRef } from '@angular/core';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { ViewCoreService } from '../../main/core/view/view-core.service';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-column-filter-trigger',
	templateUrl: './column-filter-trigger.component.html',
	providers: [PluginService]
})
export class ColumnFilterTriggerComponent implements OnInit {
	@Input() column: ColumnModel;

	context: { $implicit: ColumnFilterTriggerComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: PluginService,
		private view: ViewCoreService,
		private element: ElementRef
	) {
	}

	ngOnInit() {
		this.plugin.model.filterChanged.watch(e => {
			if (e.hasChanges('by')) {
				if (this.view.filter.has(this.column)) {
					this.element.nativeElement.classList.add(`${GRID_PREFIX}-active`);
				} else {
					this.element.nativeElement.classList.remove(`${GRID_PREFIX}-active`);
				}
			}
		});
	}
}

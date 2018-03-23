import { Component, Input, Optional, OnInit, ElementRef } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';
import { ViewCoreService } from 'ng2-qgrid/main/core/view/view-core.service';

@Component({
	selector: 'q-grid-column-filter-trigger',
	templateUrl: './column-filter-trigger.component.html'
})
export class ColumnFilterTriggerComponent extends PluginComponent implements OnInit {
	@Input() public column;

	constructor( @Optional() root: RootService, private view: ViewCoreService, private element: ElementRef) {
		super(root);
	}

	ngOnInit() {
		this.using(this.model.filterChanged.watch(e => {
			if (e.hasChanges('by')) {
				if (this.view.filter.has(this.column)) {
					this.element.nativeElement.classList.add(`${GRID_PREFIX}-active`);
				} else {
					this.element.nativeElement.classList.remove(`${GRID_PREFIX}-active`);
				}
			}
		}));
	}
}

import { Component, Input, Optional } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component';

@Component({
	selector: 'q-grid-column-filter-trigger',
	templateUrl: './column-filter-trigger.component.html'
})
export class ColumnFilterTriggerComponent extends PluginComponent {
	@Input() public column;

	constructor( @Optional() root: RootService) {
		super(root);
	}
}

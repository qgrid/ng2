import { Component, Optional, Input } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { ColumnChooserListService } from './colum-chooser-list.service';

@Component({
	selector: 'q-grid-column-chooser-list',
	templateUrl: './column-chooser-list.component.html'
})
export class ColumnChooserListComponent extends PluginComponent {
	@Input() columns: any;

	constructor(
		@Optional() root: RootService, private listService: ColumnChooserListService) {
		super(root);
	}

	onReady() {
		this.context = {
			columns: this.columns,
			columnChooser: this.listService.columnChooser
		};
	}
}

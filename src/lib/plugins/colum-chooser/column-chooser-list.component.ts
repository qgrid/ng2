import { Component, Input, OnInit } from '@angular/core';
import { ColumnChooserListService } from './colum-chooser-list.service';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-column-chooser-list',
	templateUrl: './column-chooser-list.component.html',
	providers: [PluginService]
})
export class ColumnChooserListComponent implements OnInit {
	@Input() columns: any;

	context: any;

	constructor(
		private plugin: PluginService,
		private listService: ColumnChooserListService) {
	}

	ngOnInit() {
		this.context = {
			columns: this.columns,
			columnChooser: this.listService.columnChooser
		};
	}
}

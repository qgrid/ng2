import { Component, Input, OnInit, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { DataManipulationPlugin } from '@qgrid/plugins/data-manipulation/data.manipulation.plugin';
import { GridPlugin } from '@qgrid/ngx';
import { StyleRowCallback, StyleCellCallback } from '@qgrid/core/style/style.model';

@Component({
	selector: 'q-grid-data-manipulation',
	template: '',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataManipulationComponent implements OnInit, OnChanges {
	@Input('rowFactory') dataManipulationRowFactory: (x: any) => any;
	@Input('styleRow') dataManipulationStyleRow: StyleRowCallback;
	@Input('styleCell') dataManipulationStyleCell: StyleCellCallback;

	context: {
		$implicit: DataManipulationPlugin
	};

	constructor(
		private plugin: GridPlugin
	) {
	}

	ngOnChanges(changes: SimpleChanges) {
		this.plugin.keep(changes, ['dataManipulation']);
	}

	ngOnInit() {
		const dm = new DataManipulationPlugin(this.plugin);
		this.context = { $implicit: dm };
	}
}

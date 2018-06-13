import { Component, Optional, Input, OnInit, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { DataManipulationView } from 'ng2-qgrid/plugin/data-manipulation/data.manipulation.view';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-data-manipulation',
	template: '',
	providers: [PluginService]
})
export class DataManipulationComponent implements OnInit, OnChanges {
	@Input('rowFactory') public dataManipulationRowFactory: (x: any) => any;

	context: {
		$implicit: DataManipulationView
	}

	constructor(private plugin: PluginService) {
	}

	ngOnChanges(changes: SimpleChanges) {
		this.plugin.keep(changes, ['dataManipulation']);
	}

	ngOnInit() {
		const dataManipulation = new DataManipulationView(this.plugin.model);
		this.context = { $implicit: dataManipulation };
	}
}

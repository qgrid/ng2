import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { DataManipulationView } from 'ng2-qgrid/plugin/data-manipulation/data.manipulation.view';

@Component({
	selector: 'q-grid-data-manipulation',
	template: ''
})
export class DataManipulationComponent extends PluginComponent {
	@Input('rowId') public dataManipulationRowId: (x: any) => string;
	@Input('rowFactory') public dataManipulationRowFactory: (x: any) => any;

	constructor(@Optional() root: RootService) {
		super(root);

		this.models = ['dataManipulation'];

	}

	onReady() {
		const dataManipulation = new DataManipulationView(this.model);
		this.context = { $implicit: dataManipulation };
	}
}

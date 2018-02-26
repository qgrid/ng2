import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { DataManipulationView } from 'ng2-qgrid/plugin/data-manipulation/data.manipulation.view';

@Component({
	selector: 'q-grid-data-manipulation',
	template: ''
})
export class DataManipulationComponent extends PluginComponent implements OnInit, OnDestroy {
	@Input('rowId') public dataManipulationRowId: (x: any) => string;
	@Input('rowFactory') public dataManipulationRowFactory: (x: any) => any;

	private dataManipulation: DataManipulationView;

	constructor( @Optional() root: RootService) {
		super(root);

		this.models = ['dataManipulation'];

	}

	ngOnInit() {
		this.dataManipulation = new DataManipulationView(this.model);
		this.context = { $implicit: this.dataManipulation };
	}

	ngOnDestroy() {
		this.dataManipulation.dispose();
	}
}

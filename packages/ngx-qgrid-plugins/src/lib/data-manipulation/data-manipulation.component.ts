import { Component, Input, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { DataManipulationPlugin } from '@qgrid/plugins/data-manipulation/data.manipulation.plugin';
import { GridPlugin, StateAccessor } from '@qgrid/ngx';
import { DataManipulationState } from '@qgrid/plugins/data-manipulation/data.manipulation.state';

@Component({
	selector: 'q-grid-data-manipulation',
	template: '',
	providers: [GridPlugin, StateAccessor],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataManipulationComponent implements OnInit, OnChanges {
	private dmState = this.stateAccessor.setter(DataManipulationState);

	context: {
		$implicit: DataManipulationPlugin
	};

	@Input('rowFactory') set dataManipulationRowFactory(rowFactory: (x: any) => any) { this.dmState({ rowFactory }); }

	constructor(
		private plugin: GridPlugin,
		private stateAccessor: StateAccessor,
	) {
	}

	ngOnChanges() {
		const { model } = this.plugin;
		this.stateAccessor.write(model);
	}

	ngOnInit() {
		const dm = new DataManipulationPlugin(this.plugin);
		this.context = { $implicit: dm };
	}
}

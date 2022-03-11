import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { GridPlugin, StateAccessor } from '@qgrid/ngx';
import { DataManipulationPlugin, DataManipulationState } from '@qgrid/plugins';

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

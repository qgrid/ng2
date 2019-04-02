import { Component, Input, OnInit, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { DataManipulationView } from 'ng2-qgrid/plugin/data-manipulation/data.manipulation.view';
import { PluginService } from '../plugin.service';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { StyleCellContext, StyleRowContext } from 'ng2-qgrid/core/style/style.context';

@Component({
	selector: 'q-grid-data-manipulation',
	template: '',
	providers: [PluginService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataManipulationComponent implements OnInit, OnChanges {
	@Input('rowFactory') dataManipulationRowFactory: (x: any) => any;
	@Input('styleRow') dataManipulationStyleRow: (row: any, context: StyleRowContext) => void;
	@Input('styleCell') dataManipulationStyleCell: (row: any, column: ColumnModel, context: StyleCellContext) => void;

	context: {
		$implicit: DataManipulationView
	};

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

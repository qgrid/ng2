import { Component, Input, OnInit, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { DataManipulationView } from '@qgrid/plugins/data-manipulation/data.manipulation.view';
import { Disposable } from 'ngx-qgrid';
import { GridPlugin } from 'ngx-qgrid';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { StyleCellContext, StyleRowContext } from '@qgrid/core/style/style.context';

@Component({
	selector: 'q-grid-data-manipulation',
	template: '',
	providers: [GridPlugin, Disposable],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataManipulationComponent implements OnInit, OnChanges {
	@Input('rowFactory') dataManipulationRowFactory: (x: any) => any;
	@Input('styleRow') dataManipulationStyleRow: (row: any, context: StyleRowContext) => void;
	@Input('styleCell') dataManipulationStyleCell: (row: any, column: ColumnModel, context: StyleCellContext) => void;

	context: {
		$implicit: DataManipulationView
	};

	constructor(
		private plugin: GridPlugin,
		private disposable: Disposable
	) {
	}

	ngOnChanges(changes: SimpleChanges) {
		this.plugin.keep(changes, ['dataManipulation']);
	}

	ngOnInit() {
		const dataManipulation = new DataManipulationView(this.plugin.model, this.disposable);
		this.context = { $implicit: dataManipulation };
	}
}

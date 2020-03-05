import { Component, Input, OnInit, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { DataManipulationView } from 'ng2-qgrid/plugin/data-manipulation/data.manipulation.view';
import { Disposable } from '../../infrastructure/disposable';
import { Disposable as DisposableCore } from 'ng2-qgrid/core/infrastructure/disposable';
import { PluginService } from '../plugin.service';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { StyleCellContext, StyleRowContext } from 'ng2-qgrid/core/style/style.context';

@Component({
	selector: 'q-grid-data-manipulation',
	template: '',
	providers: [PluginService, Disposable],
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
		private plugin: PluginService,
		private disposable: Disposable
	) {
	}

	ngOnChanges(changes: SimpleChanges) {
		this.plugin.keep(changes, ['dataManipulation']);
	}

	ngOnInit() {
		const dispose = new DisposableCore();
		this.disposable.add(() => dispose.dispose());

		const dataManipulation = new DataManipulationView(this.plugin.model, dispose);
		this.context = { $implicit: dataManipulation };
	}
}

import { Component, Optional, Input, Output, EventEmitter } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { ColumnChooserView } from 'ng2-qgrid/plugin/column-chooser/column.chooser.view';
import { FocusAfterRender } from '../../common/focus/focus.service';
import { ColumnChooserListService } from './colum-chooser-list.service';

const ColumnChooserName = 'qGridColumnChooser';

@Component({
	selector: 'q-grid-column-chooser',
	templateUrl: './column-chooser.component.html',
	providers: [FocusAfterRender]
})
export class ColumnChooserComponent extends PluginComponent {
	@Input('canAggregate') columnChooserCanAggregate: boolean;
	@Output('submit') submitEvent = new EventEmitter<any>();
	@Output('cancel') cancelEvent = new EventEmitter<any>();

	constructor(
		@Optional() root: RootService,
		private listService: ColumnChooserListService,
		focusAfterRender: FocusAfterRender
	) {
		super(root);

		this.models = ['columnChooser'];
	}


	onReady() {
		const context = {
			name: ColumnChooserName
		};

		const columnChooser = new ColumnChooserView(this.model, context);
		columnChooser.submitEvent.on(() => this.submitEvent.emit());
		columnChooser.cancelEvent.on(() => this.cancelEvent.emit());

		this.listService.columnChooser = columnChooser;
		this.context = { $implicit: columnChooser };
	}
}

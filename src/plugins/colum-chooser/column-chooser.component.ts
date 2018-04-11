import { Component, Optional, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { ColumnChooserView } from 'ng2-qgrid/plugin/column-chooser/column.chooser.view';
import { FocusAfterRender } from 'ng2-qgrid/plugins/focus.service';

const ColumnChooserName = 'qGridColumnChooser';

@Component({
	selector: 'q-grid-column-chooser',
	templateUrl: './column-chooser.component.html',
	providers: [FocusAfterRender]
})
export class ColumnChooserComponent extends PluginComponent implements OnInit, OnDestroy {
	@Input('canAggregate') columnChooserCanAggregate: boolean;
	@Output('submit') submitEvent = new EventEmitter<any>();
	@Output('cancel') cancelEvent = new EventEmitter<any>();

	private columnChooser: ColumnChooserView;

	constructor(
		@Optional() root: RootService, focus: FocusAfterRender) {
		super(root);

		this.models = ['columnChooser'];
	}

	ngOnInit() {
		super.ngOnInit();

		const context = {
			name: ColumnChooserName
		};

		this.columnChooser = new ColumnChooserView(this.model, context);
		this.using(this.columnChooser.submitEvent.on(() => this.submitEvent.emit()));
		this.using(this.columnChooser.cancelEvent.on(() => this.cancelEvent.emit()));

		this.context = { $implicit: this.columnChooser };
	}

	ngOnDestroy() {
		super.ngOnDestroy();

		this.columnChooser.dispose();
	}
}

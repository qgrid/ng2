import { Component, Optional, Input, Output, EventEmitter, OnInit, OnDestroy, SimpleChanges, OnChanges, NgZone } from '@angular/core';
import { ColumnChooserView } from 'ng2-qgrid/plugin/column-chooser/column.chooser.view';
import { FocusAfterRender } from '../../common/focus/focus.service';
import { PluginService } from '../plugin.service';

const ColumnChooserName = 'qGridColumnChooser';

@Component({
	selector: 'q-grid-column-chooser',
	templateUrl: './column-chooser.component.html',
	providers: [FocusAfterRender, PluginService]
})
export class ColumnChooserComponent implements OnInit, OnChanges {
	@Input('canAggregate') columnChooserCanAggregate: boolean;
	@Output('submit') submitEvent = new EventEmitter<any>();
	@Output('cancel') cancelEvent = new EventEmitter<any>();

	context: {
		$implicit: ColumnChooserView
	};

	constructor(
		private plugin: PluginService,
		private zone: NgZone,
		focusAfterRender: FocusAfterRender
	) {
	}

	ngOnChanges(changes: SimpleChanges) {
		this.plugin.keep(changes, ['columnChooser']);
	}

	ngOnInit() {
		const context = {
			name: ColumnChooserName
		};

		const columnChooser = new ColumnChooserView(this.plugin.model, context);
		columnChooser.submitEvent.on(() => this.submitEvent.emit());
		columnChooser.cancelEvent.on(() => this.cancelEvent.emit());
		columnChooser.dropEvent.on(() => this.zone.run(() => {}));

		this.context = { $implicit: columnChooser };
	}
}

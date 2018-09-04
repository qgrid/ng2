import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges, NgZone, ChangeDetectorRef } from '@angular/core';
import { ColumnChooserView } from 'ng2-qgrid/plugin/column-chooser/column.chooser.view';
import { FocusAfterRender } from '../../common/focus/focus.service';
import { PluginService } from '../plugin.service';
import { noop } from 'ng2-qgrid/core/utility/kit';
import { Node } from 'ng2-qgrid/core/node/node';

const ColumnChooserName = 'qGridColumnChooser';

export class RootContext {
	constructor(public ctrl: ColumnChooserView) {
	}

	get node() {
		return this.ctrl.treeView;
	}
}

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
		$implicit: ColumnChooserView,
		plugin: ColumnChooserComponent
	};

	constructor(
		private plugin: PluginService,
		private zone: NgZone,
		private cd: ChangeDetectorRef,
		focusAfterRender: FocusAfterRender
	) {
	}

	root() {
		return { $implicit: new RootContext(this.context.$implicit) };
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
		columnChooser.dropEvent.on(() => {
			this.cd.markForCheck();
			this.zone.run(noop);
		});

		this.context = { $implicit: columnChooser, plugin: this };
	}
}

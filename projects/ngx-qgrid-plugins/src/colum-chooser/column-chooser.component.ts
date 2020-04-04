import {
	Component,
	Input,
	Output,
	EventEmitter,
	OnInit,
	SimpleChanges,
	OnChanges,
	NgZone,
	ChangeDetectorRef,
	ChangeDetectionStrategy
} from '@angular/core';
import { ColumnChooserView } from 'qgrid/plugins/column-chooser/column.chooser.view';
import { FocusAfterRender } from '../focus/focus.service';
import { GridPlugin } from 'ngx-qgrid';
import { noop } from 'qgrid/core/utility/kit';
import { Node } from 'qgrid/core/node/node';

const ColumnChooserName = 'qGridColumnChooser';

export class RootContext {
	constructor(public ctrl: ColumnChooserView) {
	}

	get node(): Node {
		return this.ctrl.treeView;
	}
}

@Component({
	selector: 'q-grid-column-chooser',
	templateUrl: './column-chooser.component.html',
	providers: [FocusAfterRender, GridPlugin]
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
		private plugin: GridPlugin,
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

import {
	Component,
	Input,
	Output,
	EventEmitter,
	OnInit,
	OnChanges,
	NgZone,
	ChangeDetectorRef,
	ChangeDetectionStrategy
} from '@angular/core';
import { ColumnChooserPlugin } from '@qgrid/plugins/column-chooser/column.chooser.plugin';
import { ColumnChooserState } from '@qgrid/plugins/column-chooser/column.chooser.state';
import { FocusAfterRender } from '../focus/focus.service';
import { GridPlugin, StateAccessor } from '@qgrid/ngx';
import { Node } from '@qgrid/core/node/node';
import { noop } from '@qgrid/core/utility/kit';

const COLUMN_CHOOSER_NAME = 'qGridColumnChooser';

export class RootContext {
	constructor(public ctrl: ColumnChooserPlugin) {
	}

	get node(): Node {
		return this.ctrl.treeView;
	}
}

@Component({
	selector: 'q-grid-column-chooser',
	templateUrl: './column-chooser.component.html',
	providers: [
		FocusAfterRender,
		GridPlugin,
		StateAccessor
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnChooserComponent implements OnInit, OnChanges {
	private ccState = this.stateAccessor.setter(ColumnChooserState);

	@Input('canAggregate') set columnChooserCanAggregate(canAggregate: boolean) { this.ccState({ canAggregate }) };

	@Output('submit') submitEvent = new EventEmitter<any>();
	@Output('cancel') cancelEvent = new EventEmitter<any>();

	context: {
		$implicit: ColumnChooserPlugin,
		plugin: ColumnChooserComponent
	};

	constructor(
		private plugin: GridPlugin,
		private zone: NgZone,
		private cd: ChangeDetectorRef,
		private stateAccessor: StateAccessor,
		focusAfterRender: FocusAfterRender
	) {
	}

	root() {
		return { $implicit: new RootContext(this.context.$implicit) };
	}

	ngOnChanges() {
		const { model } = this.plugin;
		this.stateAccessor.write(model);
	}

	ngOnInit() {
		const context = {
			name: COLUMN_CHOOSER_NAME
		};

		const columnChooser = new ColumnChooserPlugin(this.plugin, context);
		columnChooser.submitEvent.on(() => this.submitEvent.emit());
		columnChooser.cancelEvent.on(() => this.cancelEvent.emit());
		columnChooser.dropEvent.on(() => {
			this.cd.markForCheck();
			this.zone.run(noop);
		});

		this.context = { $implicit: columnChooser, plugin: this };
	}
}

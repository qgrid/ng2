import { Component, Input, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { EditFormPanelPlugin } from '@qgrid/plugins/edit-form/edit.form.panel.plugin';
import { GridPlugin, DomTd, Grid } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-edit-form',
	templateUrl: './edit-form.component.html',
	providers: [
		GridPlugin
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFormComponent implements OnInit {
	@Input() caption: string;
	@Input() row: any;

	@Output() cancel = new EventEmitter();
	@Output() reset = new EventEmitter();
	@Output() submit = new EventEmitter();

	context: { $implicit: EditFormPanelPlugin };

	constructor(
		private plugin: GridPlugin,
	) {
	}

	ngOnInit() {
		const context = {
			row: this.row,
			caption: this.caption
		};

		const editFormPanel = new EditFormPanelPlugin(this.plugin, context);
		const { service } = this.plugin;

		editFormPanel.cancelEvent.on(() => this.cancel.emit());
		editFormPanel.resetEvent.on(() => this.reset.emit());
		editFormPanel.submitEvent.on(() => {
			this.submit.emit();

			service.invalidate({
				source: 'edit-form.component',
				why: 'refresh'
			});
		});

		this.context = { $implicit: editFormPanel };
	}
}

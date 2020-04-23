import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { EditFormPanelPlugin } from '@qgrid/plugins/edit-form/edit.form.panel.plugin';
import { GridPlugin } from '@qgrid/ngx';
import { Disposable, DomTd } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-edit-form',
	templateUrl: './edit-form.component.html',
	providers: [
		GridPlugin,
		Disposable
	]
})
export class EditFormComponent implements OnInit {
	@Input() caption: string;
	@Input() cell: DomTd;

	@Output() cancel = new EventEmitter();
	@Output() reset = new EventEmitter();
	@Output() submit = new EventEmitter();

	context: { $implicit: EditFormPanelPlugin };

	constructor(
		private plugin: GridPlugin,
		private disposable: Disposable
	) {
	}

	ngOnInit() {
		const editFormPanel = new EditFormPanelPlugin(
			this.plugin.model,
			{ row: this.cell.row, caption: this.caption },
			this.disposable
		);

		editFormPanel.submitEvent.on(() => this.submit.emit());
		editFormPanel.cancelEvent.on(() => this.cancel.emit());
		editFormPanel.resetEvent.on(() => this.reset.emit());

		this.context = { $implicit: editFormPanel };
	}
}

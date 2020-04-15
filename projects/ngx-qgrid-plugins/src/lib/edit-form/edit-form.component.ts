import { Component, Input, OnInit, OnDestroy, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { EditFormPanelView } from '@qgrid/plugins/edit-form/edit.form.panel.view';
import { GridPlugin } from 'ngx-qgrid';
import { Td } from '@qgrid/core/dom/td';
import { Disposable } from 'ngx-qgrid';

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
	@Input() cell: Td;

	@Output() cancel = new EventEmitter();
	@Output() reset = new EventEmitter();
	@Output() submit = new EventEmitter();

	context: { $implicit: EditFormPanelView };

	constructor(
		private plugin: GridPlugin,
		private disposable: Disposable
	) {
	}

	ngOnInit() {
		const view = new EditFormPanelView(
			this.plugin.model,
			{ row: this.cell.row, caption: this.caption },
			this.disposable
		);

		view.submitEvent.on(() => this.submit.emit());
		view.cancelEvent.on(() => this.cancel.emit());
		view.resetEvent.on(() => this.reset.emit());

		this.context = { $implicit: view };
	}
}

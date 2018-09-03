import { Component, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { EditFormPanelView } from 'ng2-qgrid/plugin/edit-form/edit.form.panel.view';
import { PluginService } from '../plugin.service';
import { Td } from 'ng2-qgrid/core/dom/td';

@Component({
	selector: 'q-grid-edit-form',
	templateUrl: './edit-form.component.html',
	providers: [PluginService]
})
export class EditFormComponent implements OnInit, OnDestroy {
	@Input() caption: string;
	@Input() cell: Td;

	@Output() cancel = new EventEmitter();
	@Output() reset = new EventEmitter();
	@Output() submit = new EventEmitter();

	context: { $implicit: EditFormPanelView };

	constructor(private plugin: PluginService) {
	}

	ngOnInit() {
		const view = new EditFormPanelView(this.plugin.model, { row: this.cell.row, caption: this.caption });
		view.submitEvent.on(() => this.submit.emit());
		view.cancelEvent.on(() => this.cancel.emit());
		view.resetEvent.on(() => this.reset.emit());

		this.context = { $implicit: view };
	}

	ngOnDestroy() {
		this.context.$implicit.dispose();
	}
}

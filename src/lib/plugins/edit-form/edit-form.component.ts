import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { EditFormPanelView } from 'ng2-qgrid/plugin/edit-form/edit.form.panel.view';
import { PluginService } from '../plugin.service';
import { DomTd } from 'ng2-qgrid';

@Component({
	selector: 'q-grid-edit-form',
	templateUrl: './edit-form.component.html',
	providers: [PluginService]
})
export class EditFormComponent implements OnInit, OnDestroy {
	@Input() caption: string;
	@Input() cell: DomTd;

	context: { $implicit: EditFormPanelView };

	constructor(private plugin: PluginService) {
	}

	ngOnInit() {
		const $implicit = new EditFormPanelView(this.plugin.model, { row: this.cell.row, caption: this.caption });
		this.context = { $implicit };
	}

	ngOnDestroy() {
		this.context.$implicit.dispose();
	}
}

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { EditFormPanelView } from 'ng2-qgrid/plugin/edit-form/edit.form.panel.view';
import { CellEditor } from 'ng2-qgrid/core/edit/edit.cell.editor';
import { PluginService } from '../plugin.service';
import { Output, EventEmitter } from '@angular/core';
import { DomTd } from 'ng2-qgrid';

@Component({
	selector: 'q-grid-edit-form',
	templateUrl: './edit-form.component.html',
	providers: [PluginService]
})
export class EditFormComponent implements OnInit, OnDestroy {
	@Input() title: string;
	@Input() cell: DomTd;

	@Output() cancel: EventEmitter<boolean> = new EventEmitter();
	@Output() submit: EventEmitter<boolean> = new EventEmitter();

	context: { $implicit: EditFormPanelView };

	constructor(private plugin: PluginService) {
	}

	ngOnInit() {
		const $implicit = new EditFormPanelView(this.plugin.model, { row: this.cell.row });
		this.context = { $implicit };
	}

	ngOnDestroy() {
		this.context.$implicit.dispose();
	}
}

import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { EditFormView } from 'ng2-qgrid/plugin/edit-form/edit.form.view';
import { FormGroup } from '@angular/forms';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
// import { RowEditor } from 'ng2-qgrid/core/edit/edit.row.editor';
import { EditFormPanelView } from 'ng2-qgrid/plugin/edit-form/edit.form.panel.view';
import { CellEditor } from 'ng2-qgrid/core/edit/edit.cell.editor';
import { PluginService } from '../plugin.service';
import { ViewCoreService } from '../../main/core/view/view-core.service';

@Component({
	selector: 'q-grid-edit-form',
	templateUrl: './edit-form.component.html',
	providers: [PluginService]
})
export class EditFormComponent implements OnInit, OnDestroy {
	@Input() title: string;
	@Input() cell: any;

	private panelView: any;
	private editors: CellEditor[];
	private editor: any;

	context: { $implicit: EditFormComponent } = {
		$implicit: this
	};

	constructor(private plugin: PluginService) {
	}

	ngOnInit() {
		this.panelView = new EditFormPanelView(this.plugin.model, this.cell);
		this.editor = this.panelView.editor;
		this.editors = this.panelView.editor.editors;
	}

	ngOnDestroy() {

	}

	getKey(cellEditor: any): string {
		if (cellEditor.td && cellEditor.td.column) {
			const column: ColumnModel = cellEditor.td.column;
			return column.type ? `edit-form-${column.editor ? column.editor : column.type}.tpl.html` : 'edit-form-default.tpl.html';
		}

		return 'edit-form-default.tpl.html';
	}

	save(event: any): void {
		this.panelView.submit.execute();
	}

	cancel(event: any): void {
		this.panelView.cancel.execute();
	}
}

import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { EditFormView } from 'ng2-qgrid/plugin/edit-form/edit.form.view';
import { FormGroup } from '@angular/forms';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { RowEditor } from 'ng2-qgrid/core/edit/edit.row.editor';
import { CellEditor } from 'ng2-qgrid/core/edit/edit.cell.editor';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-edit-form',
	templateUrl: './edit-form.component.html',
	providers: [PluginService]
})
export class EditFormComponent implements OnInit, OnDestroy {
	@Input() title: string;
	@Input() cell: any;

	private editors: CellEditor[];

	context: { $implicit: EditFormComponent } = {
		$implicit: this
	};

	constructor(private plugin: PluginService) {
	}

	ngOnInit() {
		const { line } = this.plugin.model.columnList();
		const editor = new RowEditor(this.cell.row, line);
		this.editors = editor.editors;
	}

	ngOnDestroy() {

	}

	getKey(column: ColumnModel): string {
		return column.type ? `edit-form-${column.editor ? column.editor : column.type}.tpl.html` : 'edit-form-default.tpl.html';
	}
}

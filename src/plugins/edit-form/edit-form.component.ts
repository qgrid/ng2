import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { EditFormView } from 'ng2-qgrid/plugin/edit-form/edit.form.view';
import { FormGroup } from '@angular/forms';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { TdCoreDirective } from 'ng2-qgrid/main/core/body/td-core.directive';
import { RowEditor } from 'ng2-qgrid/core/edit/edit.row.editor';
import { CellEditor } from 'ng2-qgrid/core/edit/edit.cell.editor';

@Component({
	selector: 'q-grid-edit-form',
	templateUrl: './edit-form.component.html'
})
export class EditFormComponent extends PluginComponent implements OnInit, OnDestroy {
	@Input() title: string;
	@Input() cell: any;
	
	private editors: CellEditor[];
	
	constructor(@Optional() root: RootService) {
		super(root);
	}

	ngOnInit() {
		const columns = this.model.data().columns;
		const editor = new RowEditor(this.cell.row, columns);
		this.editors = editor.editors;
	}

	ngOnDestroy() {

	}

	getKey(column: ColumnModel): string {
		return column.type ? `edit-form-${column.type}.tpl.html` : 'edit-form-default.tpl.html';
	}
}

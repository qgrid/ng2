import { Component, Optional, Input, OnInit } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { EditFormView } from 'ng2-qgrid/plugin/edit-form/edit.form.view';
import { FormGroup } from '@angular/forms';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { CellEditor } from 'ng2-qgrid/core/edit/edit.cell.editor';

@Component({
	selector: 'q-grid-edit-form-control',
	templateUrl: './edit-form-control.component.html'
})

export class EditFormControlComponent extends PluginComponent implements OnInit {
	@Input() cellEditor: CellEditor;
	@Input() control: any;
	@Input() key: string;
	
	constructor(@Optional() root: RootService) {
		super(root);
	}

	ngOnInit() {
		console.log(this.key);
		//console.log(this.cellEditor);
	}
}

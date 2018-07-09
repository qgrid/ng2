import { Component, Optional, Input, OnInit } from '@angular/core';
import { EditFormView } from 'ng2-qgrid/plugin/edit-form/edit.form.view';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { CellEditor } from 'ng2-qgrid/core/edit/edit.cell.editor';

@Component({
	selector: 'q-grid-edit-form-control',
	templateUrl: './edit-form-control.component.html'
})
export class EditFormControlComponent implements OnInit {
	@Input() cellEditor: CellEditor;
	@Input() control: any;
	@Input() key: string;

	context: { $implicit: EditFormControlComponent } = {
		$implicit: this
	};

	constructor() {
	}

	ngOnInit() {
		// console.log(this.key);
		// console.log(this.cellEditor);
	}
}

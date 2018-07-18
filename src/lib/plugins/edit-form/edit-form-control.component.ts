import { Component, Input } from '@angular/core';
import { CellEditor } from 'ng2-qgrid/core/edit/edit.cell.editor';

@Component({
	selector: 'q-grid-edit-form-control',
	templateUrl: './edit-form-control.component.html'
})
export class EditFormControlComponent {
	@Input() editor: CellEditor;

	get key() {
		if (this.editor) {
			const { column } = this.editor.cell;
			const type = column.editor || column.type;
			return `edit-form-${type}.tpl.html`;
		}

		return 'edit-form-text.tpl.html';
	}
}

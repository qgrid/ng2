import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CellEditor } from '@qgrid/core';

@Component({
	selector: 'q-grid-edit-form-control',
	templateUrl: './edit-form-control.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFormControlComponent {
	@Input() editor!: CellEditor;

	get key() {
		if (this.editor) {
			const { column } = this.editor.cell;
			const type = column.editor || column.type;
			return `edit-form-${type}.tpl.html`;
		}

		return 'edit-form-text.tpl.html';
	}
}

import {
	Component,
	TemplateRef,
	EventEmitter,
	Output,
	ViewChild
} from '@angular/core';

@Component({
	selector: 'q-grid-cell-editor',
	templateUrl: './cell-editor.component.html'
})
export class CellEditorComponent {
	@ViewChild(TemplateRef) template: TemplateRef<any>;
	@Output('close') closeEvent = new EventEmitter<any>();

	context: { $implicit: CellEditorComponent } = {
		$implicit: this
	};

	constructor() {

	}

	close() {
		this.closeEvent.emit();
	}
}

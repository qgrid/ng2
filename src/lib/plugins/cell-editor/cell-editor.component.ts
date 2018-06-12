import {
	Component,
	Optional,
	TemplateRef,
	ContentChild,
	EventEmitter,
	Output,
} from '@angular/core';

@Component({
	selector: 'q-grid-cell-editor',
	templateUrl: './cell-editor.component.html'
})
export class CellEditorComponent {
	@ContentChild(TemplateRef) public template: TemplateRef<any>;
	@Output('close') closeEvent = new EventEmitter<any>();

	context: { $implicit: CellEditorComponent } = {
		$implicit: this
	};

	close() {
		this.closeEvent.emit();
	}
}

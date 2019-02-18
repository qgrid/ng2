import {
	Component,
	TemplateRef,
	ContentChild,
	EventEmitter,
	Output,
	ChangeDetectionStrategy,
} from '@angular/core';

@Component({
	selector: 'q-grid-cell-editor',
	templateUrl: './cell-editor.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellEditorComponent {
	@ContentChild(TemplateRef) template: TemplateRef<any>;
	@Output('close') closeEvent = new EventEmitter<any>();

	context: { $implicit: CellEditorComponent } = {
		$implicit: this
	};

	close() {
		this.closeEvent.emit();
	}
}

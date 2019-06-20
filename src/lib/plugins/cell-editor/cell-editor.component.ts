import {
	Component,
	TemplateRef,
	EventEmitter,
	Output,
	ViewChild
} from '@angular/core';
import { ViewCoreService } from 'lib/main/core/view/view-core.service';

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

	constructor(view: ViewCoreService) {
		view.edit.cell.requestClose = () => this.close();
	}

	close() {
		this.closeEvent.emit();
	}
}

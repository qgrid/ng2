import {
	Component,
	TemplateRef,
	EventEmitter,
	Output,
	ViewChild
} from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-cell-editor',
	templateUrl: './cell-editor.component.html',
	providers: [GridPlugin]
})
export class CellEditorComponent {
	@ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;
	@Output('close') closeEvent = new EventEmitter<any>();

	context: { $implicit: CellEditorComponent } = {
		$implicit: this
	};

	constructor(plugin: GridPlugin) {
		const { view } = plugin;
		view.edit.cell.requestClose = () => {
			if (this.closeEvent.observers.length) {
				this.close();
				return true;
			}

			return false;
		};
	}

	close() {
		this.closeEvent.emit();
	}
}

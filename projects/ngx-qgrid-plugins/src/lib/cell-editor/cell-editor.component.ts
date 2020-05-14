import {
	Component,
	TemplateRef,
	EventEmitter,
	Output,
	ViewChild,
	ChangeDetectionStrategy
} from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-cell-editor',
	templateUrl: './cell-editor.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellEditorComponent {
	@ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;
	@Output('close') closeEvent = new EventEmitter<any>();

	context: { $implicit: CellEditorComponent } = {
		$implicit: this
	};

	constructor(plugin: GridPlugin) {
		const { view, disposable } = plugin;
		view.edit.cell.requestClose = () => {
			if (this.closeEvent.observers.length) {
				this.close();
				return true;
			}

			return false;
		};

		disposable.add(() => view.edit.cell.requestClose = null);
	}

	close() {
		this.closeEvent.emit();
	}
}

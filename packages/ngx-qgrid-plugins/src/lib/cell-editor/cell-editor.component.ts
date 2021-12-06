import {
	Component,
	TemplateRef,
	EventEmitter,
	Output,
	ViewChild,
	ChangeDetectionStrategy,
	OnInit
} from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-cell-editor',
	templateUrl: './cell-editor.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellEditorComponent implements OnInit {
	@ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;
	@Output('close') closeEvent = new EventEmitter<any>();

	context: { $implicit: CellEditorComponent } = {
		$implicit: this
	};

	constructor(private plugin: GridPlugin) {
	}

	ngOnInit() {
		const { view, disposable } = this.plugin;
		if (this.closeEvent.observers.length) {
			view.edit.cell.requestClose = () => {
				this.close();
				return true;
			};
		}

		disposable.add(() => view.edit.cell.requestClose = null);
	}

	close() {
		this.closeEvent.emit();
	}
}

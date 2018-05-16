import {
	Component,
	Optional,
	TemplateRef,
	ContentChild,
	EventEmitter,
	Output,
} from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from '../../infrastructure/component/root.service';

@Component({
	selector: 'q-grid-cell-editor',
	templateUrl: './cell-editor.component.html'
})
export class CellEditorComponent extends PluginComponent {
	@ContentChild(TemplateRef) public template: TemplateRef<any>;
	@Output('close') closeEvent = new EventEmitter<any>();

	constructor(root: RootService) {
		super(root);
	}

	close() {
		this.closeEvent.emit();
	}
}

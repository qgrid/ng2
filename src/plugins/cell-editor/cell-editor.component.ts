import {
	Component, 
	Optional, 
} from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';

@Component({
	selector: 'q-grid-cell-editor',
	templateUrl: './cell-editor.component.html'
})
export class CellEditorComponent extends PluginComponent {

	constructor(root: RootService) {
		super(root);
	}

}

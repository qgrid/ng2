import {
	Component, 
	Optional, 
} from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';

@Component({
	selector: 'q-grid-backdrop',
	templateUrl: './backdrop.component.html'
})
export class BackdropComponent extends PluginComponent {

	constructor(root: RootService) {
		super(root);
	}

}

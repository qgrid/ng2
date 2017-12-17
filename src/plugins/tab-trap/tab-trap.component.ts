import {
	Component, 
	Optional, 
} from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';

@Component({
	selector: 'q-grid-tab-trap',
	templateUrl: './tab-trap.component.html'
})
export class TabTrapComponent extends PluginComponent {

	constructor(root: RootService) {
		super(root);
	}

}

import { Component } from '@angular/core';
import { template } from './templates';
import { parseFactory } from 'ng2-qgrid/core/services';
import { TimePipe } from 'ng2-qgrid/common/pipes/time.pipe'


// Do not delete this code
// its required for template recompilation on changes
const debug = false;
if (debug) {
	console.log(template);
}

@Component({
	selector: 'q-grid-theme',
	templateUrl: './theme.component.gen.html'
})
export class ThemeComponent {
	private timePipe = new TimePipe();

	constructor() {
	}
}

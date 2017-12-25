import { Component } from '@angular/core';
import { template } from './templates';
import { Model } from 'ng2-qgrid/core/infrastructure/model';

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
	public model: Model;

	constructor() {}
}

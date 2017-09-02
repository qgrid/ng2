import {Component} from '@angular/core';
import {template} from './templates';
import {ChipListComponent} from './components/edit-chip-list/chip-list.component';

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
	constructor() {
	}
}

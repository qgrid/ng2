import {Component} from '@angular/core';
import {template} from './templates';

@Component({
	selector: 'q-grid-theme',
	template: template,
	styleUrls: ['./assets/cell.edit.scss']
})
export class ThemeComponent {
	constructor() {
	}
}

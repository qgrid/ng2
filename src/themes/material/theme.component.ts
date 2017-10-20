import { Component } from '@angular/core';
import { template } from './templates';
import { parseFactory } from 'ng2-qgrid/core/services';
import { getMoment } from 'ng2-qgrid/core/services';

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
	private moment = getMoment();

	getEditTime(cell) {
		return cell.label;
	}

	editTimeCommit(execute, editCell, cell) {
		execute(editCell);
	}

	onTimeInput(editCell, $event) {
		/*$view.edit.cell.value*/
		editCell.value = $event.target.valueAsDate;
	}

	formatTime(time: string): string {
		const parse = parseFactory('time');

		const date = parse(time);

		if (date === null) {
			return 'Parse time ERROR!!!';
		}

		return this.moment(date).format('H:mm A');
	}

	constructor() {
	}
}

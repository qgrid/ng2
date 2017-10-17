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

	validationNote: string = '';

	commitTime($editCell, $cell, model, $event) {
		if (model.valid){
			this.validationNote = '';
			//$editCell.label = $time.value;
			//$editCell.value = this.parseTime($time.value);
			$editCell.commit.execute($cell, $event);

		} else {
			this.validationNote = 'Value is not valid!';
		}
	}

	onTimeInput(editCell, model, $value){
		/*$view.edit.cell.value*/
		editCell.value = this.parseTime($value);
	}

	parseTime(time: string){
		const parse = parseFactory('time');
		return parse(time)
	}

	formatTime(time: string): string {

		const date: Date = this.parseTime(time);

		if (date === null) {
			return 'Parse time ERROR!!!';
		}

		return this.moment(date).format('H:mm A');
	}

	constructor() {
	}
}

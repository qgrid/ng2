import { Component, Input } from '@angular/core';
import { DomTd } from 'ng2-qgrid';

@Component({
	selector: 'q-grid-edit-form-trigger',
	templateUrl: './edit-form-trigger.component.html'
})
export class EditFormTriggerComponent {
	@Input() title: string;
	@Input() cell: DomTd;

	context: any = {
		$implicit: this
	};
}

import { Component, Input } from '@angular/core';
import { Td } from 'ng2-qgrid/core/dom/td';

@Component({
	selector: 'q-grid-edit-form-trigger',
	templateUrl: './edit-form-trigger.component.html'
})
export class EditFormTriggerComponent {
	@Input() caption: string;
	@Input() cell: Td;

	context: any = {
		$implicit: this
	};
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Td } from 'qgrid-core/dom/td';

@Component({
	selector: 'q-grid-edit-form-trigger',
	templateUrl: './edit-form-trigger.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFormTriggerComponent {
	@Input() caption: string;
	@Input() cell: Td;

	context: any = {
		$implicit: this
	};
}

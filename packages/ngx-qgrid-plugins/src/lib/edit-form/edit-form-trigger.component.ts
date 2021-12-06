import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomTd } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-edit-form-trigger',
	templateUrl: './edit-form-trigger.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFormTriggerComponent {
	@Input() caption: string;
	@Input() row: any;

	context: any = {
		$implicit: this
	};
}

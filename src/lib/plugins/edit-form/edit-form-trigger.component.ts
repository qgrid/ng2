import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { PluginService } from '../plugin.service';
import { Td } from 'ng2-qgrid/core/dom/td';

@Component({
	selector: 'q-grid-edit-form-trigger',
	templateUrl: './edit-form-trigger.component.html'
})
export class EditFormTriggerComponent {
	@Input() title: string;
	@Input() cell: Td;

	context: any = {
		$implicit: this
	};
}

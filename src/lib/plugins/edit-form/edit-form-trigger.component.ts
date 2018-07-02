import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-edit-form-trigger',
	templateUrl: './edit-form-trigger.component.html',
	providers: [PluginService]
})
export class EditFormTriggerComponent {
	@Input() title: string;
	@Input() cell: any;

	constructor(plugin: PluginService) {
	}
}

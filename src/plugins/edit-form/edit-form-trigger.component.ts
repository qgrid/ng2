import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';

@Component({
	selector: 'q-grid-edit-form-trigger',
	templateUrl: './edit-form-trigger.component.html'
})
export class EditFormTriggerComponent extends PluginComponent {

    @Input() title: string;

	constructor( @Optional() root: RootService) {
		super(root);
	}
}

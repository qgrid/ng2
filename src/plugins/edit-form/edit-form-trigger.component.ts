import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { RootService } from '../../infrastructure/component/index';
import { PluginComponent } from '../plugin.component';

@Component({
	selector: 'q-grid-edit-form-trigger',
	templateUrl: './edit-form-trigger.component.html'
})
export class EditFormTriggerComponent extends PluginComponent implements OnInit, OnDestroy {

    @Input() title: string;

	constructor( @Optional() root: RootService) {
		super(root);
	}

	ngOnInit() {
		
	}

	ngOnDestroy() {
		
	}
}

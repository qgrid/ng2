import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { RootService } from '../../infrastructure/component/index';
import { PluginComponent } from '../plugin.component';

@Component({
	selector: 'q-grid-edit-form',
	template: '<span>x</span>'
})
export class EditFormComponent extends PluginComponent implements OnInit, OnDestroy {

	constructor( @Optional() root: RootService) {
		super(root);
	}

	ngOnInit() {
		
	}

	ngOnDestroy() {
		
	}
}

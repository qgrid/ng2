import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { RootService } from '../../infrastructure/component/index';
import { PluginComponent } from '../plugin.component';

@Component({
	selector: 'q-grid-edit-form',
	templateUrl: './edit-form.component.html'
})
export class EditFormComponent extends PluginComponent implements OnInit, OnDestroy {

    @Input() title: string;

	constructor( @Optional() root: RootService) {
		super(root);
	}

	ngOnInit() {
		
	}

	ngOnDestroy() {
		
	}
}

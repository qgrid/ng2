import { RootService } from '../../infrastructure/component/index';
import { PluginComponent } from '../plugin.component';
import { Component, Optional, ChangeDetectionStrategy } from '@angular/core';
import { ActionService } from './action.service';

@Component({
	selector: 'q-grid-action-list',
	template: '',
	providers: [ActionService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionListComponent extends PluginComponent {
	constructor(
		@Optional() root: RootService,
		private actionService: ActionService
	) {
		super(root);

	}

	ngOnInit() {
		this.actionService.model = this.model;
	}
}

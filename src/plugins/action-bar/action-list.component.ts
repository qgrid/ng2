import { Component, Optional, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { ActionService } from './action.service';

@Component({
	selector: 'q-grid-action-list',
	template: '',
	providers: [ActionService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionListComponent extends PluginComponent implements OnInit {
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

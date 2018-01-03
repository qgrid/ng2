import { RootService } from '../../infrastructure/component/index';
import { PluginComponent } from '../plugin.component';
import { Component, Optional, ChangeDetectionStrategy } from '@angular/core';
import { ActionBarService } from './action-bar.service';

@Component({
	selector: 'q-grid-action-bar',
	template: '',
	providers: [ActionBarService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarComponent extends PluginComponent {
	constructor(
		@Optional() root: RootService,
		actionService: ActionBarService
	) {
		super(root);

		actionService.model = this.model;
	}
}

import { Component, Input, Optional } from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { Action as ActionItem } from 'ng2-qgrid/core/action/action';
import { RootService } from '../../infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';

@Component({
	selector: 'q-grid-action-core',
	templateUrl: './action-core.component.html'
})
export class ActionCoreComponent extends PluginComponent {
	@Input() public action: ActionItem = null;

	constructor(@Optional() root: RootService) {
		super(root);
	}

	execute() {
		const action = this.action;
		if (!action) {
			throw new AppError('action-core.component', 'Action shoud be setup');
		}

		return action.command.execute();
	}

	canExecute() {
		const action = this.action;
		if (!action) {
			throw new AppError('action-core.component', 'Action shoud be setup');
		}

		return action.command.canExecute();
	}

	get shortcut() {
		const action = this.action;
		if (!action) {
			throw new AppError('action-core.component', 'Action shoud be setup');
		}

		return action.command.shortcut;
	}

	get title() {
		const action = this.action;
		if (!action) {
			throw new AppError('action-core.component', 'Action shoud be setup');
		}

		const shortcut = this.shortcut;
		return action.title + (shortcut ? ` (${shortcut})` : '');
	}

	get icon() {
		const action = this.action;
		if (!action) {
			throw new AppError('action-core.component', 'Action shoud be setup');
		}

		return action.icon;
	}

	get templateUrl() {
		const action = this.action;
		if (!action) {
			throw new AppError('action-core.component', 'Action shoud be setup');
		}

		return action.templateUrl;
	}
}

import { Component, Input } from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { Action as ActionItem } from 'ng2-qgrid/core/action/action';
import { PluginService, GridModel } from '../plugin.service';

@Component({
	selector: 'q-grid-action-core',
	templateUrl: './action-core.component.html',
	providers: [PluginService]
})
export class ActionCoreComponent {
	@Input() action: ActionItem = null;

	context: { $implicit: ActionCoreComponent } = {
		$implicit: this
	};

	constructor(private plugin: PluginService) {
	}

	get model(): GridModel {
		return this.plugin.model;
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
			throw new AppError('action-core.component', 'Action should be setup');
		}

		return action.command.canExecute();
	}

	get shortcut() {
		const action = this.action;
		if (!action) {
			throw new AppError('action-core.component', 'Action should be setup');
		}

		return action.command.shortcut;
	}

	get title() {
		const action = this.action;
		if (!action) {
			throw new AppError('action-core.component', 'Action should be setup');
		}

		const shortcut = this.shortcut;
		return action.title + (shortcut ? ` (${shortcut.toUpperCase()})` : '');
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
			throw new AppError('action-core.component', 'Action should be setup');
		}

		return action.templateUrl;
	}
}

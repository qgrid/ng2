import { Component, Input } from '@angular/core';
import { GridError, GridPlugin, GridModel } from '@qgrid/ngx';
import { Action } from '@qgrid/core/action/action';

@Component({
	selector: 'q-grid-action-core',
	templateUrl: './action-core.component.html',
	providers: [GridPlugin]
})
export class ActionCoreComponent {
	@Input() action: Action;

	context: { $implicit: ActionCoreComponent } = {
		$implicit: this
	};

	constructor(private plugin: GridPlugin) {
	}

	get model(): GridModel {
		return this.plugin.model;
	}

	execute() {
		const action = this.action;
		if (!action) {
			throw new GridError('action-core.component', 'Action shoud be setup');
		}

		return action.command.execute();
	}

	canExecute() {
		const action = this.action;
		if (!action) {
			throw new GridError('action-core.component', 'Action should be setup');
		}

		return action.command.canExecute();
	}

	get shortcut() {
		const action = this.action;
		if (!action) {
			throw new GridError('action-core.component', 'Action should be setup');
		}

		return action.command.shortcut;
	}

	get title() {
		const action = this.action;
		if (!action) {
			throw new GridError('action-core.component', 'Action should be setup');
		}

		return action.title;
	}

	get icon() {
		const action = this.action;
		if (!action) {
			throw new GridError('action-core.component', 'Action shoud be setup');
		}

		return action.icon;
	}

	get templateUrl() {
		const action = this.action;
		if (!action) {
			throw new GridError('action-core.component', 'Action should be setup');
		}

		return action.templateUrl;
	}

	get id() {
		const action = this.action;
		if (!action) {
			throw new GridError('action-core.component', 'Action should be setup');
		}

		return action.id;
	}
}

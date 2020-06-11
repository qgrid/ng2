import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { GridError, GridPlugin, GridModel } from '@qgrid/ngx';
import { Action } from '@qgrid/core/action/action';
import { Command } from '@qgrid/core/command/command';

@Component({
	selector: 'q-grid-action-core',
	templateUrl: './action-core.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionCoreComponent {
	@Input() action: Action;

	context: { $implicit: ActionCoreComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: GridPlugin
	) {
	}

	get model(): GridModel {
		return this.plugin.model;
	}

	get command(): Command {
		const { action } = this;
		if (!action) {
			throw new GridError(
				'action-core.component',
				'Action is not set'
			);
		}

		return action.command;
	}

	get title() {
		const { action } = this;
		if (!action) {
			throw new GridError(
				'action-core.component',
				'Action is not set'
			);
		}

		return action.title;
	}

	get icon() {
		const { action } = this;
		if (!action) {
			throw new GridError(
				'action-core.component',
				'Action is not set'
			);
		}

		return action.icon;
	}

	get templateUrl() {
		const { action } = this;
		if (!action) {
			throw new GridError(
				'action-core.component',
				'Action is not set'
			);
		}

		return action.templateUrl;
	}
}

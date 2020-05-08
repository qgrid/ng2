import { Component, Input, ChangeDetectionStrategy, DoCheck, ChangeDetectorRef } from '@angular/core';
import { GridError, GridPlugin, GridModel } from '@qgrid/ngx';
import { Action } from '@qgrid/core/action/action';

@Component({
	selector: 'q-grid-action-core',
	templateUrl: './action-core.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionCoreComponent implements DoCheck {
	@Input() action: Action;

	context: { $implicit: ActionCoreComponent } = {
		$implicit: this
	};

	canExecute: boolean;

	constructor(
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef,
	) {
	}

	get model(): GridModel {
		return this.plugin.model;
	}

	ngDoCheck() {
		if (!this.action) {
			return;
		}

		const canExecute = this.action.command.canExecute();
		if (canExecute !== this.canExecute) {
			this.canExecute = canExecute;
			this.cd.markForCheck();
		}
	}

	execute() {
		const action = this.action;
		if (!action) {
			throw new GridError('action-core.component', 'Action should be setup');
		}

		return action.command.execute();
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

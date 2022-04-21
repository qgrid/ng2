import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Action, Command } from '@qgrid/core';
import { GridError, GridModel, GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-action-core',
	templateUrl: './action-core.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionCoreComponent {
	@Input() action: Action;

	context: { $implicit: ActionCoreComponent } = {
		$implicit: this,
	};

	get model(): GridModel {
		return this.plugin.model;
	}

	get command(): Command {
		const { action } = this;
		if (!action) {
			throw new GridError(
				'action-core.component',
				'Action is not set',
			);
		}

		return action.command;
	}

	get title() {
		const { action } = this;
		if (!action) {
			throw new GridError(
				'action-core.component',
				'Action is not set',
			);
		}

		return action.title;
	}

	get icon() {
		const { action } = this;
		if (!action) {
			throw new GridError(
				'action-core.component',
				'Action is not set',
			);
		}

		return action.icon;
	}

	get templateUrl() {
		const { action } = this;
		if (!action) {
			throw new GridError(
				'action-core.component',
				'Action is not set',
			);
		}

		return action.templateUrl;
	}

	get mode(): 'template' | 'icon' | 'text' | 'none' {
		const { action } = this;
		if (!action) {
			throw new GridError(
				'action-core.component',
				'Action is not set',
			);
		}

		if (action.templateUrl) {
			return 'template';
		}

		if (action.icon) {
			return 'icon';
		}

		if (action.title) {
			return 'text';
		}

		return 'none';
	}

	constructor(
		private plugin: GridPlugin,
	) {
	}
}

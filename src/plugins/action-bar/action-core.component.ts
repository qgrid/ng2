import { Component, Input, Optional } from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { Action as ActionItem } from 'ng2-qgrid/core/action/action';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
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
		const model = this.action;
		if (!model) {
			throw new AppError('action-core.component', 'Model shoud be setup');
		}

		return model.command.execute();
	}

	canExecute() {
		const model = this.action;
		if (!model) {
			throw new AppError('action-core.component', 'Model shoud be setup');
		}

		return model.command.canExecute();
	}

	get shortcut() {
		const model = this.action;
		if (!model) {
			throw new AppError('action-core.component', 'Model shoud be setup');
		}

		return model.command.shortcut;
	}

	get title() {
		const model = this.action;
		if (!model) {
			throw new AppError('action-core.component', 'Model shoud be setup');
		}

		return model.title;
	}

	get icon() {
		const model = this.action;
		if (!model) {
			throw new AppError('action-core.component', 'Model shoud be setup');
		}

		return model.icon;
	}
}

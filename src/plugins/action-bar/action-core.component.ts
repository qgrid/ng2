import { Component, Input, Optional } from '@angular/core';
import { Action as ActionItem } from 'ng2-qgrid/core/action/action';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';

@Component({
	selector: 'q-grid-action-core',
	templateUrl: './action-core.component.html'
})
export class ActionCoreComponent extends PluginComponent {
	@Input() public model: ActionItem = null;

	constructor(@Optional() root: RootService) {
		super(root);
	}

	execute() {
		const model = this.model;
		return model && model.command && model.command.execute();
	}

	canExecute() {
		const model = this.model;
		return model && model.command && model.command.canExecute();
	}

	get shortcut() {
		const model = this.model;
		if (model && model.command) {
			return model.command.shortcut;
		}
	}

	get title() {
		const model = this.model;
		if (model) {
			return model.title;
		}
	}

	get icon() {
		const model = this.model;
		if (model) {
			return model.icon;
		}
	}
}

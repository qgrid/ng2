import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActionBarService } from './action-bar.service';
import { Action as ActionItem } from 'ng2-qgrid/core/action';
import { Command } from 'ng2-qgrid/core/command/command';
import { Model } from 'ng2-qgrid/core/infrastructure/model';

@Component({
	selector: 'q-grid-action',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush    
})
export class ActionComponent {
	public id: string = null;
	public title: string = null;
	public icon: string = null;
	public command: Command = null;

	constructor(private actionService: ActionBarService) { }

	execute() {
		return this.command && this.command.execute();
	}

	canExecute() {
		return this.command && this.command.canExecute();
	}

	onInit() {
		const model = this.model;
		const action = new ActionItem(this.command, this.title, this.icon);
		action.id = this.id;

		const actions = Array.from(model.action().items);
		actions.push(action);

		model.action({
			items: actions
		});
	}

	get model(): Model {
		return this.actionService.model;
	}
}

import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { ActionService } from './action.service';
import { Action as ActionItem } from 'ng2-qgrid/core/action';
import { Command } from 'ng2-qgrid/core/command/command';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';

@Component({
	selector: 'q-grid-action',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionComponent implements OnInit {
	@Input() public id: string = null;
	@Input() public title: string = null;
	@Input() public icon: string = null;
	@Input() public command: Command = null;

	constructor(private actionService: ActionService) { }

	execute() {
		return this.command && this.command.execute();
	}

	canExecute() {
		return this.command && this.command.canExecute();
	}

	ngOnInit() {
		Guard.notNull(this.command, 'command');
		
		const model = this.model;
		const action = new ActionItem(this.command, this.title, this.icon);
		action.id = this.id;

		const actions = Array.from(model.action().items);
		actions.push(action);

		model.action({ items: actions }, { source: 'action.component' });
	}

	get model(): Model {
		return this.actionService.model;
	}
}

import { Component, Optional, Input, EventEmitter, OnInit } from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { Command } from 'ng2-qgrid/core/command/command';
import { Action } from 'ng2-qgrid/core/action/action';
import { Composite } from 'ng2-qgrid/core/infrastructure/composite';

@Component({
	selector: 'q-grid-persistence',
	template: ''
})
export class PersistenceComponent extends PluginComponent implements OnInit {
	constructor(@Optional() root: RootService) {
		super(root);

		this.models = ['persistence'];
	}

	ngOnInit() {
		super.ngOnInit();

		const action =
			new Action(
				new Command(),
				'Save/Load',
				'history'
			);

		action.templateUrl = 'plugin-persistence.tpl.html';

		this.model.action({
			items: Composite.list([[action], this.model.action().items])
		});
	}
}

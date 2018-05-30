import { Component, Optional, Input, EventEmitter, OnInit } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { Command } from 'ng2-qgrid/core/command/command';
import { Action } from 'ng2-qgrid/core/action/action';
import { Composite } from 'ng2-qgrid/core/infrastructure/composite';
import { PersistenceItem } from 'ng2-qgrid/plugin/persistence/persistence.view';
import { PersistenceService } from 'ng2-qgrid/core/persistence/persistence.service';

@Component({
	selector: 'q-grid-persistence',
	template: ''
})
export class PersistenceComponent extends PluginComponent implements OnInit {
	constructor(@Optional() root: RootService) {
		super(root);

		this.models = ['persistence'];
	}

	onReady() {
		const model = this.root.model;
		const id = `q-grid:${model.grid().id}:persistence-list`;
		model.persistence({id});
		model.persistence().storage
			.getItem(id)
			.then((items: PersistenceItem[]) => {
				if (!items || items.length === 0) {
					return;
				}
				const defaultItem = items.find(item => item.isDefault);
				if (defaultItem) {
					const persistenceService = new PersistenceService(model);
					persistenceService.load(defaultItem.model);
				}
			});

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

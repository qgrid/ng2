import { Component, Optional, Input, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Command } from 'ng2-qgrid/core/command/command';
import { Action } from 'ng2-qgrid/core/action/action';
import { Composite } from 'ng2-qgrid/core/infrastructure/composite';
import { PersistenceItem } from 'ng2-qgrid/plugin/persistence/persistence.view';
import { PersistenceService } from 'ng2-qgrid/core/persistence/persistence.service';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-persistence',
	template: '',
	providers: [PluginService]
})
export class PersistenceComponent implements OnInit, OnChanges {
	constructor(private plugin: PluginService) {
	}

	ngOnChanges(changes: SimpleChanges) {
		this.plugin.keep(changes, ['persistence']);
	}

	ngOnInit() {
		const { model } = this.plugin;
		const id = `q-grid:${model.grid().id}:persistence-list`;
		model.persistence({ id });
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

		this.plugin.model.action({
			items: Composite.list([[action], this.plugin.model.action().items])
		}, {
				source: 'persistence.component'
			});
	}
}

import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Command } from '@qgrid/core/command/command';
import { Action } from '@qgrid/core/action/action';
import { Composite } from '@qgrid/core/infrastructure/composite';
import { PersistenceItem } from '@qgrid/plugins/persistence/persistence.plugin';
import { PersistenceService } from '@qgrid/core/persistence/persistence.service';
import { GridPlugin, Disposable, GridModelBuilder } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-persistence',
	template: '',
	providers: [GridPlugin, Disposable]
})
export class PersistenceComponent implements OnInit, OnChanges {
	constructor(
		private plugin: GridPlugin,
		private modelBuilder: GridModelBuilder,
		private disposable: Disposable
	) {
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
					const persistenceService = new PersistenceService(model, () => this.modelBuilder.build());
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
		action.id = 'persistence';

		const items = Composite.list([model.action().items, [action]]);
		model.action({ items }, { source: 'persistence.component' });

		this.disposable.add(() => {
			const newItems = model.action().items.filter(x => x.id === action.id);
			model.action({ items: newItems }, { source: 'persistence.component' });
		});
	}
}

import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { Command } from '@qgrid/core/command/command';
import { Action } from '@qgrid/core/action/action';
import { Composite } from '@qgrid/core/infrastructure/composite';
import { PersistenceItem } from '@qgrid/plugins/persistence/persistence.plugin';
import { PersistenceService } from '@qgrid/core/persistence/persistence.service';
import { GridPlugin, GridModelBuilder, StateAccessor, GridEvent } from '@qgrid/ngx';
import { PersistenceSchedule, PersistenceState } from '@qgrid/core/persistence/persistence.state';
import { PersistenceStorage } from '@qgrid/core/persistence/persistence.storage';
import { filter, takeOnce } from '@qgrid/core/rx/rx.operators';

@Component({
	selector: 'q-grid-persistence',
	template: '',
	providers: [GridPlugin, StateAccessor],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersistenceComponent implements OnInit, OnChanges {
	private persistenceState = this.stateAccessor.setter(PersistenceState);

	@Input('schedule') set schedule(schedule: PersistenceSchedule) { this.persistenceState({ schedule }); }
	@Input('storage') set storage(storage: PersistenceStorage) { this.persistenceState({ storage }); }

	constructor(
		private plugin: GridPlugin,
		private modelBuilder: GridModelBuilder,
		private stateAccessor: StateAccessor,
	) {
	}

	ngOnChanges() {
		const { model } = this.plugin;
		this.stateAccessor.write(model);
	}

	ngOnInit() {
		const { model, disposable, observe, observeReply, table } = this.plugin;

		const id = `q-grid:${model.grid().id}:persistence-list`;
		model.persistence({ id });

		const persistenceService = new PersistenceService(model, () => this.modelBuilder.build());


		observeReply(model.dataChanged)
			.pipe(
				filter(e => {
					if (e.hasChanges('rows')) {
						const count = e.state.rows.length;
						if (count > 0) {
							return true;
						}
					}

					return false;
				}),
				takeOnce()
			)
			.subscribe(() =>
				model.persistence()
					.storage
					.getItem(id)
					.then((items: PersistenceItem[]) => {
						if (!items || items.length === 0) {
							return;
						}

						const defaultItem = items.find(item => item.isDefault);
						if (defaultItem) {
							persistenceService.load(defaultItem.model);
						}
					})
			);

		switch (model.persistence().schedule) {
			case 'onDemand': {
				const historyAction =
					new Action(
						new Command(),
						'Save/Load',
						'history'
					);

				historyAction.templateUrl = 'plugin-persistence.tpl.html';

				const items = Composite.list([model.action().items, [historyAction]]);
				model.action({ items }, { source: 'persistence.component' });

				disposable.add(() => {
					const notPersistenceActions = model.action().items.filter(x => x !== historyAction);
					model.action({ items: notPersistenceActions }, { source: 'persistence.component' });
				});

				break;
			}
			case 'onStateChange': {
				const { settings, storage, defaultGroup } = model.persistence();
				for (const state of Object.keys(settings)) {
					for (const key of settings[state]) {
						observe(model[state + 'Changed'] as GridEvent<any>)
							.pipe(
								filter(e => e.hasChanges(key) && e.tag.source !== 'persistence.service')
							)
							.subscribe(e => {
								const currentModel = persistenceService.save();
								const item = {
									title: `auto-save: ${state}.${key} changed`,
									modified: Date.now(),
									group: defaultGroup,
									model: currentModel,
									isDefault: true,
									canEdit: false
								};

								storage.setItem(id, [item]);
							});
					}
				}

				break;
			}
		}
	}
}

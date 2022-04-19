import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import {
	Action, Command, Composite, filter, PersistenceSchedule,
	PersistenceService, PersistenceState, PersistenceStorage, takeOnce
} from '@qgrid/core';
import { GridEvent, GridModelBuilder, GridPlugin, StateAccessor } from '@qgrid/ngx';
import { PersistenceItem } from '@qgrid/plugins';

@Component({
	selector: 'q-grid-persistence',
	template: '',
	providers: [GridPlugin, StateAccessor],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersistenceComponent implements OnInit, OnChanges {
	@Input('schedule') set schedule(schedule: PersistenceSchedule) { this.persistenceState({ schedule }); }
	@Input('storage') set storage(storage: PersistenceStorage) { this.persistenceState({ storage }); }

	private persistenceState = this.stateAccessor.setter(PersistenceState);
	private service: PersistenceService | null = null;

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
		const { model, disposable, observe, observeReply } = this.plugin;

		const id = `q-grid:${model.grid().id}:persistence-list`;
		model.persistence({ id });

		this.service = new PersistenceService(model, () => this.modelBuilder.build());

		observeReply(model.dataChanged)
			.pipe(
				filter(e => {
					if (e.hasChanges('rows') || e.hasChanges('columns')) {
						const {rows, columns} = e.state;
						if (rows.length > 0 && columns.length > 0) {
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
							this.service.load(defaultItem.model);
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
							// TODO: get rid of e.tag.source check
							filter(e => e.hasChanges(key) && e.tag.source !== 'persistence.service')
						)
						.subscribe(() => {
							const currentModel = this.service.save();
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

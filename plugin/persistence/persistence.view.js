import {PluginView} from '../plugin.view';
import {PersistenceService} from '@grid/core/persistence/persistence.service';
import {Command, CommandManager} from '@grid/core/command';
import {stringifyFactory} from '@grid/core/services/';
import {Shortcut, ShortcutDispatcher} from '@grid/core/shortcut';
import {clone} from '@grid/core/utility';
import {Event} from '@grid/core/infrastructure';

export class PersistenceView extends PluginView {
	constructor(model) {
		super();

		this.items = [];
		this.title = '';
		this.state = {
			editItem: null,
			oldValue: null
		};
		this.model = model;
		this.storageKey = `q-grid:${model.grid().id}:${model.persistence().id}:persistence-list`;
		this.persistenceService = new PersistenceService(model);
		this.closeEvent = new Event();

		this.model.persistence()
			.storage
			.getItem(this.storageKey)
			.then(items => {
				this.items = items || [];
				const defaultItem = this.items.find(item => item.isDefault);
				if (defaultItem) {
					this.persistenceService.load(defaultItem.model);
				}
			});

		this.using(this.model.gridChanged.watch(e => {
			if (e.hasChanges('status') && e.state.status === 'unbound') {
				this.closeEvent.emit();
			}
		}));

		this.save = new Command({
			source: 'persistence.view',
			execute: () => {
				this.items.push({
					title: this.title,
					modified: Date.now(),
					model: this.persistenceService.save(),
					isDefault: false
				});

				model.persistence()
					.storage
					.setItem(this.storageKey, this.items);

				this.title = '';

				return true;
			},
			canExecute: () => !!this.title && this.isUniqueTitle(this.title)
		});

		this.edit = {
			enter: new Command({
				source: 'persistence.view',
				execute: item => {
					item = item || this.items.find(this.isActive);
					if (!item) {
						return false;
					}
					this.state.editItem = item;
					this.state.oldValue = clone(item);
					return true;
				},
				canExecute: () => this.state.editItem === null
			}),
			commit: new Command({
				source: 'persistence.view',
				shortcut: 'enter',
				execute: item => {
					item = item || this.state.editItem;
					if (!this.title || !this.isUniqueTitle(item.title)) {
						this.edit.cancel.execute();
						return false;
					}
					item.modified = Date.now();
					model.persistence()
						.storage
						.setItem(this.storageKey, this.items);
					this.state.editItem = null;
					return true;
				},
				canExecute: () => this.state.editItem !== null
			}),
			cancel: new Command({
				source: 'persistence.view',
				shortcut: 'escape',
				execute: () => {
					if (this.state.editItem !== null) {
						const index = this.items.indexOf(this.state.editItem);
						this.items.splice(index, 1, this.state.oldValue);
						this.state.oldValue = null;
						this.state.editItem = null;
					} else {
						this.closeEvent.emit();
					}
					return true;
				}
			})
		};

		this.load = new Command({
			source: 'persistence.view',
			execute: item => this.persistenceService.load(item.model)
		});

		this.remove = new Command({
			source: 'persistence.view',
			execute: item => {
				const index = this.items.indexOf(item);
				if (index >= 0) {
					this.items.splice(index, 1);

					this.model.persistence()
						.storage
						.setItem(this.storageKey, this.items);
					return true;
				}
				return false;
			}
		});

		this.setDefault = new Command({
			source: 'persistence.view',
			execute: item => {
				const index = this.items.indexOf(item);
				if (index === -1) {
					return false;
				}

				if (item.isDefault) {
					item.isDefault = false;
				} else {
					this.items.forEach(i => i.isDefault = false);
					item.isDefault = true;
				}
				this.items.splice(index, 1, item);

				this.model.persistence()
					.storage
					.setItem(this.storageKey, this.items);
				return true;
			}
		});

		const commandManager = new CommandManager();
		const shortcut = new Shortcut(new ShortcutDispatcher());

		this.keyDown = e => shortcut.keyDown(e);

		shortcut.register(commandManager, [
			this.edit.enter,
			this.edit.commit,
			this.edit.cancel
		]);
	}

	isActive(item) {
		return JSON.stringify(item.model) === JSON.stringify(this.persistenceService.save()); // eslint-disable-line angular/json-functions
	}

	stringify(item) {
		const model = item.model;
		const targets = [];
		const settings = this.model.persistence().settings;

		for (let key in settings) {
			const stringify = stringifyFactory(key);
			const target = stringify(model[key]);
			if (target !== '') {
				targets.push(target);
			}
		}

		return targets.join('; ') || 'No settings';
	}

	isUniqueTitle(title) {
		return !this.items.some(item => {
			return item !== this.state.editItem
				&& item.title.toLowerCase() === title.toLowerCase();
		});
	}
}
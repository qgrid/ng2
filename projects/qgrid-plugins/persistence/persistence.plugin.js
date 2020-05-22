import { PersistenceService } from '@qgrid/core/persistence/persistence.service';
import { Command } from '@qgrid/core/command/command';
import { CommandManager } from '@qgrid/core/command/command.manager';
import { stringifyFactory } from '@qgrid/core/services/model.stringify';
import { Shortcut } from '@qgrid/core/shortcut/shortcut';
import { ShortcutDispatcher } from '@qgrid/core/shortcut/shortcut.dispatcher';
import { clone } from '@qgrid/core/utility/kit';
import { Event } from '@qgrid/core/event/event';

export class PersistencePlugin {
	constructor(plugin, createDefaultModel) {
		const { model, observeReply } = plugin;

		this.plugin = plugin;
		this.service = new PersistenceService(model, createDefaultModel);
		this.closeEvent = new Event();
		this.items = [];
		this.state = {
			editItem: null,
			oldValue: null
		};

		const { persistence } = model;

		this.id = persistence().id;
		this.title = this.stringify();

		persistence()
			.storage
			.getItem(this.id)
			.then(items => {
				this.items = items || [];
				this.groups = this.buildGroups(this.items);
			});

		observeReply(model.gridChanged)
			.subscribe(e => {
				if (e.hasChanges('status') && e.state.status === 'unbound') {
					this.closeEvent.emit();
				}
			});

		this.create = new Command({
			source: 'persistence.view',
			execute: () => {
				const item = {
					title: this.title,
					modified: Date.now(),
					model: this.service.save(),
					isDefault: false,
					group: persistence().defaultGroup,
					canEdit: true
				};

				if (persistence().create.execute(item) !== false) {
					this.items.push(item);
					this.persist();
					this.title = '';
					return true;
				}
				return false;
			},
			canExecute: () => {
				if (!!this.title && this.isUniqueTitle(this.title)) {
					const item = {
						title: this.title,
						modified: Date.now(),
						model: this.service.save(),
						isDefault: false,
						group: persistence().defaultGroup,
						canEdit: true
					};

					return persistence().create.canExecute(item);
				}

				return false;
			}
		});

		this.edit = {
			enter: new Command({
				source: 'persistence.view',
				execute: item => {
					item = item || this.items.find(this.isActive);
					if (!item) {
						return false;
					}
					this.state = {
						editItem: item,
						oldValue: clone(item)
					};
					return true;
				},
				canExecute: item => this.state.editItem === null && item.canEdit
			}),
			commit: new Command({
				source: 'persistence.view',
				shortcut: 'enter',
				execute: item => {
					item = item || this.state.editItem;
					if (persistence().modify.execute(item) !== false) {
						const title = item.title;
						if (!title || !this.isUniqueTitle(title)) {
							this.edit.cancel.execute();
							return false;
						}
						item.modified = Date.now();
						this.persist();
						this.state.editItem = null;
						return true;
					}
					return false;
				},
				canExecute: () =>
					this.state.editItem !== null &&
					persistence().modify.canExecute(this.state.editItem)
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
			canExecute: item => persistence().load.canExecute(item),
			execute: item => {
				if (persistence().load.execute(item) !== false) {
					this.service.load(item.model);
					return true;
				}

				return false;
			}
		});

		this.reset = new Command({
			source: 'persistence.view',
			execute: () => {
				if (persistence().reset.execute() !== false) {
					this.service.reset();
				}
				return false;
			},
			canExecute: () => persistence().reset.canExecute()
		});

		this.remove = new Command({
			source: 'persistence.view',
			execute: item => {
				const index = this.items.indexOf(item);
				if (index >= 0) {
					if (persistence().remove.execute(item) !== false) {
						this.items.splice(index, 1);

						this.persist();
						return true;
					}
				}
				return false;
			},
			canExecute: item =>
				item.canEdit && persistence().remove.canExecute(item)
		});

		this.setDefault = new Command({
			source: 'persistence.view',
			canExecute: item => persistence().setDefault.canExecute(item),
			execute: item => {
				if (persistence().setDefault.execute(item) !== false) {
					const index = this.items.indexOf(item);
					if (index === -1) {
						return false;
					}

					if (item.isDefault) {
						item.isDefault = false;
					} else {
						this.items.forEach(i => (i.isDefault = false));
						item.isDefault = true;
					}
					this.items.splice(index, 1, item);

					this.persist();
					return true;
				}

				return false;
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

	get blank() {
		return {
			title: 'Blank',
			modified: Date.now(),
			model: {},
			isDefault: false,
			group: 'blank',
			canEdit: false
		};
	}

	get sortedItems() {
		return this.items.sort((a, b) => b.modified - a.modified);
	}

	buildGroups(items) {
		return items
			.reduce((memo, item) => {
				const group = memo.find(m => m.key === item.group);
				if (group) {
					group.items.push(item);
				} else {
					memo.push({
						key: item.group,
						items: [item]
					});
				}
				return memo;
			}, []);
	}

	isActive(item) {
		return JSON.stringify(item.model) === JSON.stringify(this.service.save()); // eslint-disable-line angular/json-functions
	}

	persist() {
		const { model } = this.plugin;

		model
			.persistence()
			.storage
			.setItem(this.id, this.items.filter(item => item.canEdit));

		this.groups = this.buildGroups(this.items);
	}

	stringify(item) {
		const { settings } = this.plugin.model.persistence();
		const model = item ? item.model : this.service.save();
		const targets = [];

		for (let key in settings) {
			if (!model[key]) {
				continue;
			}

			const stringify = stringifyFactory(key);
			const target = stringify(model[key]);
			if (target !== '') {
				targets.push(target);
			}
		}

		return targets.join('; ') || 'No settings';
	}

	isUniqueTitle(title) {
		title = (title || '').trim().toLowerCase();
		return !this.items
			.some(item =>
				item !== this.state.editItem &&
				(item.title || '').toLowerCase() === title
			);
	}
}

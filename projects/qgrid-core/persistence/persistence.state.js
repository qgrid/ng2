import { PersistenceStorage } from './persistence.storage';
import { Command } from '../command/command';

export class PersistenceState {
	constructor() {
		this.id = 'default';
		this.defaultGroup = 'My Presets';
		this.load = new Command();
		this.remove = new Command();
		this.create = new Command();
		this.modify = new Command();
		this.setDefault = new Command();
		this.reset = new Command();

		this.storage = new PersistenceStorage(localStorage);
		this.settings = {
			group: ['by'],
			sort: ['by'],
			pivot: ['by'],
			filter: ['by'],
			queryBuilder: ['node']
		};
	}
}

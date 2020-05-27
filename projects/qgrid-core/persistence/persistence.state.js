import { PersistenceStorage } from './persistence.storage';
import { Command } from '../command/command';

export class PersistenceState {
	constructor() {
		this.id = 'default';
		this.defaultGroup = 'My Presets';
		this.load = new Command({ source: 'persistence.model' });
		this.remove = new Command({ source: 'persistence.model' });
		this.create = new Command({ source: 'persistence.model' });
		this.modify = new Command({ source: 'persistence.model' });
		this.setDefault = new Command({ source: 'persistence.model' });
		this.reset = new Command({ source: 'persistence.model' });

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

import { PersistenceStorage } from './persistence.storage';
import { Command } from '../command';

export class PersistenceModel {
	constructor() {
		this.id = 'default';
		this.storage = new PersistenceStorage(localStorage);
		this.load = new Command({ source: 'persistence.model' });
		this.remove = new Command({ source: 'persistence.model' });
		this.settings = {
			group: ['by'],
			sort: ['by'],
			pivot: ['by'],
			filter: ['by'],
			queryBuilder: ['node']
		};
	}
}
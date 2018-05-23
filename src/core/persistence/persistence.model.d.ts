import {Command} from '../command/command';
import {PersistenceStorage} from './persistence.storage';

/**
 * > Under construction
 */
export declare class PersistenceModel {
	id: string;
	defaultGroup: string;
	storage: PersistenceStorage;
	load: Command;
	remove: Command;
	create: Command;
	modify: Command;
	setDefault: Command;
	reset: Command;
	settings: object;
}

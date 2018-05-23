import { Model } from '../infrastructure/model';

export declare class PersistenceService {
	constructor(model: Model);

	save(settings?: object): object;
	load(model: object, settings?: object): void;
	reset(settings?: object): object;
}

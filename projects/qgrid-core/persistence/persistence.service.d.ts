import { Model } from '../model/model';

export declare class PersistenceService {
	constructor(model: Model, createDefaultModel: () => Model);

	save(settings?: { [key: string]: string[] }): { [key: string]: any };
	load(model: { [key: string]: any }, settings?: { [key: string]: string[] }): void;
	reset(settings?: { [key: string]: string[] }): { [key: string]: any };
}

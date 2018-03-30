import { Model } from './model';

export declare class ModelBinder {
	constructor(source: object);

	source: object;
	off: () => void;

	bind(model: Model, names?: string[], run?: boolean): () => void;
}

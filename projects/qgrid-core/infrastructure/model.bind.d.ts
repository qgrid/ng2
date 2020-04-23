import { Model } from './model';
import { Disposable } from './disposable';

export declare class ModelBinder {
	constructor(host: any, disposable: Disposable);

	bound(model: Model, names?: string[], run?: boolean, track?: boolean): () => void;
}

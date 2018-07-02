import { Model } from './model';
import { Disposable } from './disposable';

export declare class ModelBinder extends Disposable {
	constructor(host: any);

	bound(model: Model, names?: string[], run?: boolean, track?: boolean): () => void;
}

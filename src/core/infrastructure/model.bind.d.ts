import { Model } from './model';
import { Disposable } from './disposable';

export declare class ModelBinder extends Disposable {
	constructor(subject: any);

	bound(model: Model, names?: string[], run?: boolean): () => void;
}

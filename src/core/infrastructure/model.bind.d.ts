import { Model } from './model';
import { Disposable } from './disposable';

export declare class ModelBinder extends Disposable {
	constructor(subject: any);

	bind(model: Model, names?: string[], run?: boolean): () => void;
}

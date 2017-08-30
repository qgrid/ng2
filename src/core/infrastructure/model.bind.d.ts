import {INoopResult} from '../utility/utility';
import {Model} from './model';

export interface IBindResult {
	(): void;
}

export declare class ModelBinder {
	constructor(source: object);
	source: object;
	off: INoopResult;
	bind(model: Model, names?: string[], run?: boolean): IBindResult;
}

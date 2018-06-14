import { Model } from './model';
import { Disposable } from '../infrastructure/disposable';

export declare class ModelProxy extends Disposable {
	constructor(model: Model, temp?: boolean)

	target: Model;
	subject: Model;	
}
import { Model } from './model';
import { Disposable } from '../infrastructure/disposable';

export declare class ModelProxy {
	constructor(
		model: Model,
		disposable: Disposable,
		temp?: boolean,
	)

	target: Model;
	subject: Model;
}
import { Model } from '../../core/infrastructure/model';
import { Validator } from '../../core/validation/validation.service';

export declare class ValidatorView {
	constructor(model: Model, context: any);

	context: any;
	model: { [ key: string ]: any };
	oldErrors: any[];
	validator: Validator;
	readonly errors: any[];
	readonly rules: any[];
	readonly type: string;
	readonly value: any;
}

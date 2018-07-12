import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Validator } from 'ng2-qgrid/core/validation/validation.service';

export declare class ValidatorView {
	constructor(model: Model, context: { type: string });

	context: any;
	model: { [ key: string ]: any };
	oldErrors: any[];
	validator: Validator;
	readonly errors: any[];
	readonly rules: any[];
	readonly type: string;
	readonly value: any;
}

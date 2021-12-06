import { Model, Validator } from '@qgrid/core';

export declare class ValidatorPlugin {
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

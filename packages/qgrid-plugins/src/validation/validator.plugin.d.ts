import { Model, Validator } from '@qgrid/core';

export declare class ValidatorPlugin {
	context: any;
	model: { [ key: string ]: any };
	oldErrors: any[];
	validator: Validator;
	readonly errors: any[];
	readonly rules: any[];
	readonly type: string;
	readonly value: any;

	constructor(model: Model, context: any);
}

import {Resource} from '../resource/resource';

/**
 * A class to setup validation rules settings.
 */
export declare class ValidationModel {
	constructor();

	resource: Resource;

	/**
	 * List of validation rules.
	 */
	rules: object[];
}

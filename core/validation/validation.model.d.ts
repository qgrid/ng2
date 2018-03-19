import {Resource} from '../resource/resource';

/**
 * A class to setup validation rules settings.
 *
 * ### Suggested Links
 *
 * * [LIVR](https://github.com/koorchik/LIVR)
 */
export declare class ValidationModel {
	constructor();

	resource: Resource;

	/**
	 * List of validation rules.
	 */
	rules: object[];
}

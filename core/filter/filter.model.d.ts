import { Resource } from '../resource/resource';
import { IMatchResult } from './match';
import { INoopResult } from '../utility/utility';

/**
 * A class to setup data filters and expressions.
 */
export declare class FilterModel {
	resource: Resource;

	by: object;
	/**
	 * Filter representation enum:
	 * 1. `default` - filtration through column filters and external plugins.
	 * 2. `row` - filtration through header row filter and external plugins.
	 */
	unit: string;
	match: IMatchResult;
	fetch: INoopResult;
	assertFactory: any;
}

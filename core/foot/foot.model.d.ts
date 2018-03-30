import {EnumerableResource} from '../resource/resource.enumerable';
import {Cache} from '../infrastructure/cache';

export declare class FootModel {
	constructor();

	resource: EnumerableResource;
	cache: Cache<string, any>;
}

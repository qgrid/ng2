import { EnumerableResource } from '../resource/resource.enumerable';
import { Cache } from '../infrastructure/cache';

export declare interface FootModel {
	resource?: EnumerableResource;
	cache?: Cache<string, any>;
}

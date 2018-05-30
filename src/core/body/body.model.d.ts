import { Resource } from '../resource/resource';
import { Cache } from '../infrastructure/cache';

export declare interface BodyModel {
	resource?: Resource;
	cache?: Cache<string, any>;
}

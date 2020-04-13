import { Resource } from '../resource/resource';
import { Cache } from '../infrastructure/cache';

export declare interface BodyModel {
	cache?: Cache<string, any>;
}

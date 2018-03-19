import {Resource} from '../resource/resource';
import {Cache} from '../infrastructure/cache';

export declare class HeadModel {
	constructor();

	resource: Resource;
	cache: Cache<string, any>;
}

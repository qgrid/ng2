import {Resource} from '../resource/resource';
import {IMatchResult} from './match';
import {INoopResult} from '../utility/utility';

export declare class FilterModel {
	constructor();
	resource: Resource;
	by: object;
	match: IMatchResult;
	fetch: INoopResult;
}

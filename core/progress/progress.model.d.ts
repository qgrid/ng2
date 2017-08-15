import {Resource} from '../resource/resource';

export declare class ProgressModel {
	constructor();
	resource: Resource;
	isBusy: boolean;
	queue: any[];
}

import {Resource} from '../resource/resource';

export declare class PaginationModel {
	constructor();
	resource: Resource;
	current: number;
	size: number;
	sizeList: number[];
	count: number;
}


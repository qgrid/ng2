import {Resource} from './resource';

export declare class EnumerableResource extends Resource {
	constructor(data: object, scope: object, public count: number);
}


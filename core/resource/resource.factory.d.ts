import {Resource} from './resource';
import {EnumerableResource} from './resource.enumerable';

export declare type EnumerableResourceOrResource = EnumerableResource | Resource;
export declare function factory(resource: EnumerableResourceOrResource, key: string): EnumerableResourceOrResource;

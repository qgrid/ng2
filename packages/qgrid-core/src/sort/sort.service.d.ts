import { Model } from '../model/model';

export declare const getKey: (pair: string | Record<string, any>) => string;
export declare const getIndex: (pairs: string[] | Record<string, any>[], pairKey: string) => number;
export declare const getDirection: (pair: string | Record<string, any>) => string;
export declare const getMap: (pairs: string[] | Record<string, any>[]) => any;
export declare function orderFactory(model: Model): (by: any[]) => any[];

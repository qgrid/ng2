import { Model } from '../model/model';

export declare const getKey: (pair: any) => string;
export declare const getIndex: (pairs: any[], pairKey: string) => number;
export declare const getDirection: (pair: any) => string;
export declare const getMap: (pairs: any[]) => any;
export declare function orderFactory(model: Model);

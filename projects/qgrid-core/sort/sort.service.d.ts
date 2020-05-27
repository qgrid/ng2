import { Model } from '../model/model';

export declare const key: (pair: any) => string;
export declare const index: (pairs: any[], pairKey: string) => number;
export declare const direction: (pair: any) => string;
export declare const map: (pairs: any[]) => any;
export declare function orderFactory(model: Model);

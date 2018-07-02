import { Model } from '../infrastructure/model';

export declare const key: (pair: object) => string;
export declare const index: (pairs: object[], pairKey: string) => number;
export declare const direction: (pair: object) => string;
export declare const map: (pairs: object[]) => object;
export declare function orderFactory(model: Model);

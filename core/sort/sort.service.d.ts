import {Model} from '../infrastructure/model';

export interface IMapResult {
	(pairs: object[]): object;
}

export  interface IIndexResult {
	(pairs: object[], pairKey: string): number;
}

export interface IValueResult {
	(pair: object): string;
}

export interface IKeyResult {
	(pair: object): string;
}

export declare const key: IKeyResult;
export declare const index: IIndexResult;
export declare const direction: IValueResult;
export declare const map: IMapResult;
export declare function orderFactory(model: Model);
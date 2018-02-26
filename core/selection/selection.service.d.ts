import { Model } from '../infrastructure/model';
import { ColumnModel } from '../column-type/column.model';

declare type ReturnIdentityOrColumnKey = (x: any) => any | IColumnKeyResult;
declare type ReturnIdentityOrIRowKeyResultOrIGetFactoryResult = (x: any) => any | IRowKeyResult;

type IColumnKeyResult = (column: ColumnModel) => string;

type IRowKeyResult = (row: any) => number;

declare function hashColumnKeyFactory(model: Model): ReturnIdentityOrColumnKey;
declare function hashRowKeyFactory(model: Model): ReturnIdentityOrIRowKeyResultOrIGetFactoryResult;
declare function hashKeyFactory<K>(model: Model): (any) => K;
declare function cellMatchFactory(): boolean;
declare function keySelector(unit: string, selector: object): any;

export declare class SelectionService {
	constructor(model: Model);

	lookup(items: object[], unit: string): any[];
	map(entries: any[]): any[];
	keyFactory<K>(unit: string): (any) => K;
	hashFactory(): (key: string) => any;
}

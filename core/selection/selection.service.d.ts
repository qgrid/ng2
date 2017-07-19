import {IGetFactoryResult} from '../services/value';
import {Model} from '../infrastructure/model';
import {ColumnModel} from '../column-type/column.model';
import {IIdentityResult} from '../utility/utility';

declare type ReturnIdentityOrColumnKey = IIdentityResult | IColumnKeyResult;
declare type ReturnIdentityOrIRowKeyResultOrIGetFactoryResult = IIdentityResult | IRowKeyResult | IGetFactoryResult;

declare interface IColumnKeyResult{
	(column: ColumnModel): string;
}

declare interface IRowKeyResult{
	(row: any): number;
}

export declare interface IHashFactoryResult{
	(entry: string): any;
}

declare function hashColumnKeyFactory(model: Model): ReturnIdentityOrColumnKey;
declare function hashRowKeyFactory(model: Model): ReturnIdentityOrIRowKeyResultOrIGetFactoryResult;
declare function hashKeyFactory<K>(model: Model): (any) => K;
declare function cellMatchFactory(): boolean;
declare function keySelector(unit: string, selector: object): any;

export declare class SelectionService {
	constructor();
	lookup(items: object[], unit: string): any[];
	map(entries: any[]): any[];
	keyFactory<K>(unit: string): (any) => K;
	hashFactory(): IHashFactoryResult;
}

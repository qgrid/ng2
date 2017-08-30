import {Node} from './node';
import {IMapResult} from '../column/column.service';
import {IValueFactory} from '../services/value';

export interface ILodashGroupBy{
	(collection: any[], iteratee: any): object;
}

export declare function nodeBuilder(columnMap: IMapResult, groupBy: ILodashGroupBy, valueFactory: IValueFactory, level: number): Node[];

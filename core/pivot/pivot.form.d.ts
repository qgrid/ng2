import {IPivot} from '../pipe/column.pipe';

export interface IComparator{
	(): any;
}

export declare function pivotForm(source: object, comparator: IComparator): IPivot;

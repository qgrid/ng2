import {IPivot} from '../pipe/pipe.item';

export interface IComparator {
	(): any;
}

export declare function pivotForm(source: object, comparator: IComparator): IPivot;

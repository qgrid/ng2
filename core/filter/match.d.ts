import {Grid} from '..src/view/services';

export declare interface IMatchResult{
	(context: Grid): boolean;
}

export declare function match(context: Grid): boolean;
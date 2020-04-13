import { Model } from '../../infrastructure/model';
import { Range } from '../../infrastructure/range';

export interface RangeMark {
	element: HTMLElement;
	columnRange: Range;
	rowRange: Range;
}

export declare class SelectorMark {
	constructor(model: Model, markup: { [key: string]: HTMLElement }, name: string);

	select(): RangeMark[];
}

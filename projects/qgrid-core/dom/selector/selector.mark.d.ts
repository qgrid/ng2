import { Model } from '../../model/model';
import { Range } from '../../infrastructure/range';
import { Markup } from '../../services/markup';

export interface RangeMark {
	element: HTMLElement;
	columnRange: Range;
	rowRange: Range;
}

export declare class SelectorMark {
	constructor(model: Model, markup: Markup, name: string);

	select(): RangeMark[];
}

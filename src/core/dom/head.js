import {Box} from './box';
import {SelectorMark} from './selector';

export class Head extends Box {
	constructor(context, model, markup) {
		super(context, model, new SelectorMark(model, markup, 'head'));
	}
}
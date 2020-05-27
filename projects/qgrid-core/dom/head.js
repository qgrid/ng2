import { Box } from './box';
import { SelectorMark } from './selector/selector.mark';

export class Head extends Box {
	constructor(context, model, markup) {
		super(context, model, new SelectorMark(model, context.markup, 'head'));
	}
}
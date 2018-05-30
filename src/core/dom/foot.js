import { Box } from './box';
import { SelectorMark } from './selector/selector.mark';

export class Foot extends Box {
	constructor(context, model, markup) {
		super(context, model, new SelectorMark(model, markup, 'foot'));
	}
}
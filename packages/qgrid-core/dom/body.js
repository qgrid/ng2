import { VirtualBox } from './virtual/box';
import { Box } from './box';
import { SelectorMark } from './selector/selector.mark';

export class Body extends Box {
	constructor(context, model) {
		super(context, model, new SelectorMark(model, context.markup, 'body'));
	}
}

export class VirtualBody extends VirtualBox {
	constructor(context, model) {
		super(context, model, new SelectorMark(model, context.markup, 'body'));
	}
}
import {VirtualBox} from './virtual';
import {Box} from './box';
import {SelectorMark} from './selector';

export class Body extends Box {
	constructor(context, model, markup) {
		super(context, model, new SelectorMark(model, markup, 'body'));
	}
}

export class VirtualBody extends VirtualBox {
	constructor(context, model, markup) {
		super(context, model, new SelectorMark(model, markup, 'body'));
	}
}
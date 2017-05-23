import {Element} from './element';

export class Cell extends Element {
	constructor(context, element = null) {
		super(element);

		this.context = context;
	}

	get model() {
		return this.context.model(this.getElement());
	}
}
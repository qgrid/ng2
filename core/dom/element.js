import {Unit} from './unit';

export class Element extends Unit {
	constructor(element) {
		super();

		this.element = element;
	}

	getElementCore() {
		return this.element;
	}
}
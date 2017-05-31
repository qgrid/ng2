import {Row} from '../row';

export class VirtualRow extends Row {
	constructor(box, index, element = null) {
		super(box, index, element);
	}

	addClass(name) {
		this.box.addRowClass(this, name);
	}

	removeClass(name) {
		this.box.removeRowClass(this, name);
	}
}

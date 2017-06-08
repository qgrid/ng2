import {Row} from '../row';

export class VirtualRow extends Row {
	constructor(box, index, element = null) {
		super(box, index, element);
	}

	addClass(name, force = false) {
		this.box.addRowClass(this, name, force);
	}

	removeClass(name, force = false) {
		this.box.removeRowClass(this, name, force);
	}
}

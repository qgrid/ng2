import {Element} from './element';

export class Cell extends Element {
	constructor(context, element = null) {
		super(element);

		this.context = context;
	}

	get model() {
		return this.context.model(this.getElement());
	}

	addClass(name) {
		const model = this.model;
		if (model) {
			this.context.styleStorage.addCellClass(name, model.rowIndex, model.columnIndex);
		}

		super.addClass(name);
	}

	removeClass(name) {
		const model = this.model;
		if (model) {
			this.context.styleStorage.removeCellClass(name, model.rowIndex, model.columnIndex);
		}

		super.removeClass(name);
	}
}
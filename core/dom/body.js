import {VirtualBox} from './virtual';
import {Box} from './box';
import * as columnService from '../column/column.service';

function getElements(markup) {
	const result = [];
	if (markup.hasOwnProperty('body-left')) {
		result.push(markup['body-left']);
	}

	if (markup.hasOwnProperty('body')) {
		result.push(markup['body']);
	}

	if (markup.hasOwnProperty('body-right')) {
		result.push(markup['body-right']);
	}

	return result;
}

export class Body extends Box {
	constructor(context, model, markup) {
		super(context, model);

		this.markup = markup;
	}

	columnCount() {
		const columns = this.gridModel.view().columns;
		return columnService.lineView(columns).length;
	}

	rowCount() {
		const elements = this.getElements();
		if (elements.length) {
			return elements[0].rows.length;
		}

		return 0;
	}

	getElementsCore() {
		return getElements(this.markup);
	}
}

export class VirtualBody extends VirtualBox {
	constructor(context, model, markup) {
		super(context, model);

		this.markup = markup;
	}

	columnCount() {
		const columns = this.gridModel.view().columns;
		return columnService.lineView(columns).length;
	}

	getElementsCore() {
		return getElements(this.markup);

	}
}
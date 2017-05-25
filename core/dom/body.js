import {Box} from './box';
import * as columnService from '../column/column.service';

export class Body extends Box {
	constructor(context, model, markup) {
		super(context, model);

		this.markup = markup;
	}

	columnCount() {
		const columns = this.gridModel.view().columns;
		return columnService.lineView(columns).length;
	}

	// rowCount() {
	// 	const model = this.gridModel;
	// 	if (model.scroll().mode === 'virtual') {
	// 		return Math.min(model.view().rows.length, model.pagination().size);
	// 	}
   //
	// 	return model.view().rows.length;
	// }

	getElementsCore() {
		const markup = this.markup;
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
}
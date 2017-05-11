import {View} from '../view';

export class FilterView extends View {
	constructor(model) {
		super(model);
	}

	has(column) {
		const key = column.key;
		const filterBy = this.model.filter().by;
		return filterBy.hasOwnProperty(key);
	}
}
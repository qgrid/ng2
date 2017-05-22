import {Box} from './box';

export class Head extends Box {
	constructor(context, model, markup) {
		super(context, model);

		this.markup = markup;
	}

	getElementsCore() {
		const markup = this.markup;
		const result = [];
		if (markup.hasOwnProperty('head-left')) {
			result.push(markup['head-left']);
		}

		if (markup.hasOwnProperty('head')) {
			result.push(markup['head']);
		}

		if (markup.hasOwnProperty('head-right')) {
			result.push(markup['head-right']);
		}

		return result;
	}
}
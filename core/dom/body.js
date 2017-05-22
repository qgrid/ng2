import {Box} from './box';

export class Body extends Box {
	constructor(context, model, markup) {
		super(context, model);

		this.markup = markup;
	}

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
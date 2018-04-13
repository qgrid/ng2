import {isFunction} from 'ng2-qgrid/core/utility';
import {AppError} from 'ng2-qgrid/core/infrastructure';
import {PipeUnit} from 'ng2-qgrid/core/pipe/pipe.unit';
import {PluginView} from '../plugin.view';
import {serialize as serializeGet} from './get.serialize';
import {serialize as serializePost} from './post.serialize';

export class Rest extends PluginView {
	constructor(model, {get, post}) {
		super(model);

		const {method, url} = this.model.rest();
		const fetch = this.fetchFactory(method, get, post);
		const serialize = this.serializeFactory(method, model.rest().serialize);

		if (!url) {
			throw new AppError('rest', 'REST endpoint URL is required');
		}

		model.data({
			pipe: [
				(data, context, next) => {
					fetch(url, serialize(model))
						.then(data => next(data));
				},
				...PipeUnit.view
			]
		});
	}

	fetchFactory(method, get, post) {
		if (method.toLowerCase() === 'get') {
			return get;
		} else if (method.toLowerCase() === 'post') {
			return post;
		} else {
			throw new AppError('rest', `"${method}" is incorrect REST method`);
		}
	}

	serializeFactory(method, serialize) {
		if (isFunction(serialize)) {
			return serialize;
		} else if (method === 'get') {
			return serializeGet;
		} else if (method === 'post') {
			return serializePost;
		}
	}
}

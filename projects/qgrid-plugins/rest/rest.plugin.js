import { isFunction } from '@qgrid/core/utility/kit';
import { GridError } from '@qgrid/core/infrastructure/error';
import { PipeUnit } from '@qgrid/core/pipe/pipe.unit';
import { serialize as serializeGet } from '@qgrid/core/rest/get.serialize';
import { serialize as serializePost } from '@qgrid/core/rest/post.serialize';

export class RestPlugin {
	constructor(model, { get, post }) {
		this.model = model;

		const { method, url, serialize } = this.model.rest();
		if (!url) {
			throw new GridError('rest', 'REST endpoint URL is required');
		}

		const fetch = this.fetchFactory(method, get, post);
		const doSerialize = this.serializeFactory(method, serialize);

		model.data({
			pipe: [
				(data, context, next) => {
					fetch(url, doSerialize(model)).then(data => next(data));
				},
				...PipeUnit.view
			]
		}, { source: 'rest.view' });
	}

	fetchFactory(method, get, post) {
		switch (method.toLowerCase()) {
			case 'get':
				return get;
			case 'post':
				return post;
			default:
				throw new GridError('rest', `"${method}" is incorrect REST method`);
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

import {merge, isFunction} from 'ng2-qgrid/core/utility';
import {AppError} from 'ng2-qgrid/core/infrastructure';
import {PipeUnit} from 'ng2-qgrid/core/pipe/pipe.unit';
import {PluginView} from '../plugin.view';
import {serialize as serializeGet} from './get.serialize';
import {serialize as serializePost} from './post.serialize';

export class Rest extends PluginView {
	constructor(model, config) {
		super(model);

		const settings = merge({
			method: 'get'
		}, config);

		const fetch = this.fetchFactory(settings);
		const serialize = this.serializeFactory(settings);

		if (!settings.url) {
			throw new AppError('rest', 'REST endpoint URL is required');
		}

		model.data({
			pipe: [
				(data, context, next) => {
					fetch(settings.url, serialize(model))
						.then(data => next(data));
				},
				...PipeUnit.view
			]
		});
	}

	fetchFactory(settings) {
		if (settings.method.toLowerCase() === 'get') {
			return settings.get;
		} else if (settings.method.toLowerCase() === 'post') {
			return settings.post;
		} else {
			throw new AppError('rest', `"${settings.method}" is incorrect REST method`);
		}
	}

	serializeFactory(settings) {
		if (isFunction(settings.serialize)) {
			return settings.serialize;
		} else if (settings.method === 'get') {
			return serializeGet;
		} else if (settings.method === 'post') {
			return serializePost;
		}
	}
}

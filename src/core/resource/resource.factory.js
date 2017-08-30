import {Resource} from './resource';
import {EnumerableResource} from './resource.enumerable';

export function factory(resource, key) {
	const data = resource.data;
	const scope = resource.scope;
	if (resource instanceof EnumerableResource) {
		let keyIndex = 1;
		let count = resource.count;
		const originKey = key;
		while (data.hasOwnProperty(key)) {
			key = originKey + keyIndex++;
		}

		if (count < keyIndex) {
			count = keyIndex;
		}

		return (content, env) => {
			// TODO: do we need full clone here?
			data[key] = content;
			if (Object.keys(env).length) {
				scope[key] = env;
			}
			return new EnumerableResource(data, scope, count);
		};
	}

	return (content, env) => {
		// TODO: do we need full clone here?
		data[key] = content;
		if (Object.keys(env).length) {
			scope[key] = env;
		}
		return new Resource(data, scope);
	};
}
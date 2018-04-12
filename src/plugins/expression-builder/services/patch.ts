import * as utility from './utility';

export function method(object, key) {
	const sourceFunction = object[key];

	return {
		with: withFactory(object, key, sourceFunction)
	};
}

export function methodsOf(obj) {
	const keys = Object.keys(obj);
	const length = keys.length;
	const patch = {};

	for (let i = 0; i < length; i++) {
		const key = keys[i];

		if (utility.isFunction(obj[key])) {
			patch[key] = method(obj, key);
		}
	}

	return {
		with: function () {
			const keys = Object.keys(patch);
			const length = keys.length;
			const args = utility.asArray(arguments);

			for (let i = 0; i < length; i++) {
				const key = keys[i];
				obj.action = key;
				patch[key].with.apply(obj, args);
			}
		}
	};
}

export function withFactory(object, key, sourceFunction) {
	const withFunction = function () {
		const args = utility.asArray(arguments);

		object[key] = function () {
			const argList = utility.asArray(arguments);
			return sourceFunction.apply(object, args.concat(argList));
		};
	};

	withFunction.decorator = function (decorate) {
		const args = utility.asArray(arguments).slice(1);

		object[key] = function () {
			return decorate.apply(object, [sourceFunction, object, key].concat(args));
		};
	};

	return withFunction;
}

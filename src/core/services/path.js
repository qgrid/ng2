export function compile(path) {
	const parts = path.split('.');
	const last = parts.length - 1;
	const accessor = getAccessor(parts, last);
	const key = parts[last];
	if (accessor) {
		return function(entry, value) {
			if (arguments.length === 2) {
				accessor(entry)[key] = value;
			}

			return accessor(entry)[key];
		};
	}

	return function(entry, value) {
		if (arguments.length === 2) {
			entry[key] = value;
		}

		return entry[key];
	};
}

export function compileGet(path) {
	const parts = path.split('.');
	const last = parts.length - 1;
	const accessor = getAccessor(parts, last);
	const key = parts[last];
	if (accessor) {
		return function(entry) {
			return accessor(entry)[key];
		};
	}

	return function(entry) {
		return entry[key];
	};
}

export function compileSet(path) {
	const parts = path.split('.');
	const last = parts.length - 1;
	const accessor = getAccessor(parts, last);
	const key = parts[last];
	if (accessor) {
		return function(entry, value) {
			accessor(entry)[key] = value;
		};
	}

	return function(entry, value) {
		entry[key] = value;
	};
}

function getAccessor(parts, last) {
	return parts
		.filter((part, index) => index !== last)
		.reduce(
			(accessor, part) =>
				accessor ? entry => accessor(entry)[part] : entry => entry[part],
			null
		);
}

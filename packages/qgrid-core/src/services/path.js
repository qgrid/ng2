import { Log } from '../infrastructure/log';

export function compile(parts) {
	const last = parts.length - 1;
	const accessor = getAccessor(parts, last);
	const key = parts[last];
	if (accessor) {
		return function (entry, value) {
			if (arguments.length === 2) {
				const host = accessor(entry);
				if (host) {
					host[key] = value;
				}

				Log.warn('path.compile', `Object reference ${parts.join('.')} is not set.`);
				return;
			}

			const host = accessor(entry);
			if (host) {
				return host[key];
			}

			Log.warn('path.compile', `Object reference ${parts.join('.')} is not set.`);
			return null;
		};
	}

	return function (entry, value) {
		if (!entry) {
			Log.warn('path.compile', `Object reference ${parts.join('.')} is not set.`);
			return null;
		}

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
		return function (entry) {
			const host = accessor(entry);
			if (host) {
				return host[key];
			}

			Log.warn('path.compile', `Object reference ${parts.join('.')} is not set.`);
			return null;
		};
	}

	return function (entry) {
		if (!entry) {
			Log.warn('path.compile', `Object reference ${parts.join('.')} is not set.`);
			return null;
		}

		return entry[key];
	};
}

export function compileSet(path) {
	const parts = path.split('.');
	const last = parts.length - 1;
	const accessor = getAccessor(parts, last);
	const key = parts[last];
	if (accessor) {
		return function (entry, value) {
			const host = accessor(entry);
			if (host) {
				host[key] = value;
				return;
			}

			Log.warn('path.compile', `Object reference ${parts.join('.')} is not set.`);
		};
	}

	return function (entry, value) {
		if (entry) {
			entry[key] = value;
			return;
		}

		Log.warn('path.compile', `Object reference ${parts.join('.')} is not set.`);
	};
}

function getAccessor(parts, last) {
	if (parts.length > 1) {
		const firstPart = parts[0];
		return parts
			.filter((_, index) => index > 0 && index !== last)
			.reduce(
				(accessor, part) => {
					return graph => {
						const host = accessor(graph);
						if (host) {
							return host[part];
						}

						return null;
					}
				},
				graph => {
					if (graph) {
						return graph[firstPart];
					}

					return null;
				}
			);
	}

	return null;
}

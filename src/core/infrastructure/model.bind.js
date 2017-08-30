import {noop, toCamelCase, isUndefined} from '../utility';
import {Log} from './log';

export class ModelBinder {
	constructor(source) {
		this.source = source;
		this.off = noop;
	}

	bind(model, names, run = true) {
		this.off();
		const source = this.source;

		if (model) {
			const commits = [];
			for (let name of names) {
				const doBind = e => {
					Log.info('model.bind', `to ctrl "${name}[${Object.keys(e.changes).join(', ')}]"`);

					for (let key of Object.keys(e.changes)) {
						const sourceKey = toCamelCase(name, key);
						if (source.hasOwnProperty(sourceKey)) {
							source[sourceKey] = e.changes[key].newValue;
						}
					}
				};

				const state = model[name];
				if (run) {
					const value = state();
					doBind({
						changes: {
							newValue: value,
							oldValue: value
						}
					});
				}

				this.off = model[name + 'Changed'].on(doBind);

				commits.push(() => {
					Log.info('model.bind', `to model "${name}"`);

					const oldState = state();
					const newState = {};
					for (let key of Object.keys(oldState)) {
						const sourceKey = toCamelCase(name, key);
						if (source.hasOwnProperty(sourceKey)) {
							let value = source[sourceKey];
							if (!isUndefined(value)) {
								newState[key] = value;
							}
						}
					}

					state(newState);
				});
			}

			return () => commits.forEach(commit => commit());
		}

		this.off = noop;
		return noop;
	}
}
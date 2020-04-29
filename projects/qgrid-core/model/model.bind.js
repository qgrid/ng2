import { noop, toCamelCase, isUndefined, isArray } from '../utility/kit';
import { Log } from '../infrastructure//log';

export class ModelBinder {
	constructor(host, plugin) {
		this.host = host;
		this.plugin = plugin;
	}

	canWrite(oldValue, newValue, key) {
		if (isUndefined(newValue)) {
			Log.warn('model.bind', `can't write undefined to the model[${key}]`);
			return false;
		}

		// As `Observable | async` returns null by default so we need to filter it out
		if (isArray(oldValue) && newValue === null) {
			Log.warn('model.bind', `the model[${key}] expects array, got ${newValue}`);
			return false;
		}

		return true;
	}

	bound(model, stateNames, run = true, track = true) {
		if (model) {
			const commits = [];
			for (let stateName of stateNames) {
				const state = model[stateName];
				const pack = this.packFactory(stateName);
				const write = this.writeFactory(stateName);

				if (run) {
					const oldState = state();
					const newState = pack(oldState);
					const changes = this.buildChanges(newState);
					write({ changes });
				}

				if (track) {
					this.disposable.add(
						model[stateName + 'Changed'].on(write)
					);
				}

				commits.push(() => {
					Log.info('model.bind', `to model "${stateName}"`);

					const oldState = state();
					const newState = pack(oldState);
					state(newState);
				});
			}

			return () => commits.forEach(commit => commit());
		}

		return noop;
	}

	writeFactory(name) {
		const host = this.host;
		return e => {
			const changes = Object.keys(e.changes);
			for (let diffKey of changes) {
				const hostKey = toCamelCase(name, diffKey);
				if (host.hasOwnProperty(hostKey)) {
					const diff = e.changes[diffKey];
					host[hostKey] = diff.newValue;
				}
			}
		};
	}

	packFactory(name) {
		return state => {
			const host = this.host;
			const newState = {};
			for (let stateKey of Object.keys(state)) {
				const hostKey = toCamelCase(name, stateKey);
				if (host.hasOwnProperty(hostKey)) {
					const oldValue = state[stateKey];
					const newValue = host[hostKey];
					if (this.canWrite(oldValue, newValue, stateKey)) {
						newState[stateKey] = newValue;
					}
				}
			}

			return newState;
		};
	}

	buildChanges(state) {
		return Object
			.keys(state)
			.reduce((memo, key) => {
				const value = state[key];
				memo[key] = {
					newValue: value,
					oldValue: value
				};
				return memo;
			}, {})
	}
}

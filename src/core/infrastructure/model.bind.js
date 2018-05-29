import { noop, toCamelCase, isUndefined, isArray, isObject } from '../utility/kit';
import { Disposable } from './disposable';
import { Log } from './log';

export class ModelBinder extends Disposable {
	constructor(subject) {
		super();

		this.subject = subject;
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

	bound(model, names, run = true) {
		const subject = this.subject;
		if (model) {
			const commits = [];
			for (let name of names) {
				const doBind = e => {
					Log.info('model.bind', `to ctrl "${name}[${Object.keys(e.changes).join(', ')}]"`);

					for (let key of Object.keys(e.changes)) {
						const sourceKey = toCamelCase(name, key);
						if (subject.hasOwnProperty(sourceKey)) {
							subject[sourceKey] = e.changes[key].newValue;
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

				this.using(model[name + 'Changed'].on(doBind));

				commits.push(() => {
					Log.info('model.bind', `to model "${name}"`);

					const oldState = state();
					const newState = {};
					for (let key of Object.keys(oldState)) {
						const sourceKey = toCamelCase(name, key);
						if (subject.hasOwnProperty(sourceKey)) {
							const value = subject[sourceKey];
							if (this.canWrite(oldState[key], value, key)) {
								newState[key] = value;
							}
						}
					}

					state(newState);
				});
			}

			return () => commits.forEach(commit => commit());
		}

		return noop;
	}
}
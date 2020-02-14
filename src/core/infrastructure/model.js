import {Event} from './event';
import {AppError} from './error';
import {Guard} from './guard';
import {isObject, isArray} from '../utility/kit';

function equals(x, y) {
	// TODO: improve equality algorithm
	if (x === y) {
		return true;
	}

	if (isArray(x)) {
		if (x.length === 0 && y.length === 0) {
			return true;
		}
		const distinct = getDistinct(x);
		if (distinct.length === y.length) {
			// TODO: compare arrays to be sure that they are identical
		}
	}

	if (x instanceof Map) {
		if (x.size === 0 && y.size === 0) {
			return true;
		}
	}

	if (x instanceof Set) {
		if (x.size === 0 && y.size === 0) {
			return true;
		}
	}

	return false;
}

function getDistinct(x) {
	return x.filter((y, i) => x.indexOf(x.find(z => z.id === y.id)) === i);
}

export class Model {
	constructor(state) {
		for (let name of Object.keys(state)) {
			const Type = state[name];
			const model = new Type();
			const changeSet = new Set();
			const watchArg = () => {
				const prevChanges = Array.from(changeSet.values())
					.reduce((memo, key) => {
						const value = model[key];
						memo[key] = {newValue: value, oldValue: value};
						return memo;
					}, {});

				return {
					state: model,
					changes: prevChanges,
					hasChanges: prevChanges.hasOwnProperty.bind(prevChanges),
					tag: {},
					source: 'watch',
				};
			};

			const event = new Event(watchArg);
			this[name + 'Changed'] = event;
			this[name] = function (state, tag) {
				const {length} = arguments;
				if (length) {
					if (!isObject(state)) {
						throw new AppError(
							`model.${name}`,
							`"${state}" is not a valid type, should be an object`);
					}

					const changes = {};
					let hasChanges = false;
					const keys = Object.keys(state);
					for (let i = 0, keyLength = keys.length; i < keyLength; i++) {
						const key = keys[i];
						if (!model.hasOwnProperty(key)) {
							throw new AppError(
								`model.${name}`,
								`"${key}" is not a valid key, only [${Object.keys(model).join(', ')}] keys are supported`
							);
						}

						const newValue = state[key];
						const oldValue = model[key];
						if (!equals(newValue, oldValue)) {
							// Log.info('model', `value changed - "${name}.${key}"`);
							Guard.notUndefined(newValue, `model.${name}.${key}`);

							model[key] = newValue;
							hasChanges = true;
							changes[key] = {
								newValue: newValue,
								oldValue: oldValue
							};

							changeSet.add(key);
						}
						// else {
						// 	Log.warn('model', `value was not changed - "${name}.${key}"`);
						// }
					}

					if (hasChanges) {
						event.emit({
							state: model,
							changes,
							hasChanges: changes.hasOwnProperty.bind(changes),
							tag: length > 1 ? tag : {},
							source: 'emit'
						});
					}

					return this;
				}

				return model;
			};
		}
	}
}

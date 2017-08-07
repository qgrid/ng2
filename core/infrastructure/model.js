import {Event} from './event';
import {AppError} from './error';
import {Guard} from './guard';
import {Log} from './log';
import {isObject, isFunction} from '../utility';

const models = {};
let close = false;

export class Model {
	constructor() {
		close = true;
		for (let name of Object.keys(models)) {
			const model = new models[name]();
			const changeSet = new Set();
			const watchArg = () => {
				const changes = Array.from(changeSet.values())
					.reduce((memo, key) => {
						const value = model[key];
						memo[key] = {newValue: value, oldValue: value};
						return memo;
					}, {});

				return {
					state: model,
					hasChanges: changes.hasOwnProperty.bind(changes),
					changes: changes,
					tag: {},
					source: 'watch',
				};
			};

			const event = new Event(watchArg);
			this[name + 'Changed'] = event;
			this[name] = function (state, tag) {
				const length = arguments.length;
				if (length) {
					if (!isObject(state)) {
						throw new AppError(
							`model.${name}`,
							`"${state}" is not a valid type, should be an object`);
					}

					let hasChanges = false;
					const changes = {};
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
						if (newValue !== oldValue) {
							Log.info('model', `value changed - "${name}.${key}"`);
							Guard.notUndefined(newValue, `model.${name}.${key}`);

							model[key] = newValue;
							hasChanges = true;
							changes[key] = {
								newValue: newValue,
								oldValue: oldValue
							};

							changeSet.add(key);
						}
						else {
							Log.warn('model', `value was not changed - "${name}.${key}"`);
						}
					}

					if (hasChanges) {
						event.emit({
							state: model,
							hasChanges: changes.hasOwnProperty.bind(changes),
							changes: changes,
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

	static register(name, model) {
		if (models.hasOwnProperty(name)) {
			throw new AppError(
				'model',
				`"${name}" is already registered`);
		}

		if (!isFunction(model)) {
			throw new AppError(
				`model.${name}`,
				`"${model}" is not a valid type, should be an constructor function`);
		}

		if (close) {
			throw new AppError(
				`model.${name}`,
				'can\'t register, registration was closed');
		}

		models[name] = model;
		return Model;
	}
}
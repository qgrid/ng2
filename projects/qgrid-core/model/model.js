import { GridError } from '../infrastructure/error';
import { Event } from '../event/event';
import { Guard } from '../infrastructure/guard';
import { isArray, isObject, getTypeName } from '../utility/kit';
import { Log } from '../infrastructure/log';

function equals(x, y) {
	// TODO: improve equality algorithm
	if (x === y) {
		return true;
	}

	if (isArray(x)) {
		if (x.length === 0 && y.length === 0) {
			return true;
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

export class Model {
	constructor() {
		this.accessors = new Map();
	}

	inject(name, Type) {
		const accessor = this.resolveAccessor(name, Type);
		this[name + 'Changed'] = accessor.changed;
		this[name] = accessor.state;
	}

	resolveAccessor(name, Type) {
		if (this.accessors.has(name)) {
			throw new GridError(
				'model',
				`${name} accessor already exists`
			);
		}

		const accessor = this.buildAccessor(name, Type);
		this.accessors.set(Type, accessor);
		return accessor;
	}

	buildAccessor(name, Type) {
		let state = new Type();

		const changeSet = new Set();
		const reply = () => {
			const replyChanges = Array.from(changeSet.values())
				.reduce((memo, key) => {
					const value = state[key];
					memo[key] = { newValue: value, oldValue: value };
					return memo;
				}, {});

			return {
				state,
				changes: replyChanges,
				hasChanges: replyChanges.hasOwnProperty.bind(replyChanges),
				tag: {},
				source: 'watch',
			};
		};

		const event = new Event(reply);
		const getter = () => state;
		const setter = (newState, tag) => {
			if (!isObject(newState)) {
				throw new GridError(
					`model.${name}`,
					`"${newState}" is not a valid type, should be an object`);
			}

			const changes = {};
			let hasChanges = false;

			const keys = Object.keys(newState);
			for (let i = 0, keysLength = keys.length; i < keysLength; i++) {
				const key = keys[i];
				if (!state.hasOwnProperty(key)) {
					throw new GridError(
						`model.${name}`,
						`"${key}" is not a valid key, only [${Object.keys(state).join(', ')}] keys are supported`
					);
				}

				const newValue = newState[key];
				const oldValue = state[key];
				if (!equals(newValue, oldValue)) {
					Log.info('model', `value changed - "${name}.${key}"`);
					Guard.notUndefined(newValue, `model.${name}.${key}`);

					state[key] = newValue;
					hasChanges = true;
					changes[key] = { newValue, oldValue };

					changeSet.add(key);
				}
				else {
					Log.warn('model', `value was not changed - "${name}.${key}"`);
				}
			}

			if (hasChanges) {
				state = {
					...state
				};

				event.emit({
					state,
					changes,
					hasChanges: changes.hasOwnProperty.bind(changes),
					tag: tag || {},
					source: 'emit'
				});
			}

			return this;
		}

		const accessor = (...args) => {
			if (args.length) {
				return setter(args[0], args[1]);
			}

			return getter();
		};

		return {
			changed: event,
			state: accessor,
		};
	}

	resolve(Type) {
		let accessor = this.accessors.get(Type);
		if (!accessor) {
			const name = getTypeName(Type);
			accessor = this.resolveAccessor(name, Type);
		}

		return accessor;
	}
}

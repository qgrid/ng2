import { Guard } from './guard';

export class ModelProxy {
	constructor(target, disposable, temp) {
		const modelHandler = {
			get: (target, key) => {
				Guard.hasProperty(target, key);

				const selector = target[key];
				if (key.endsWith('Changed')) {
					const eventHandler = {
						get: (event, key) => (...args) => disposable.add(event[key](...args))
					};

					return new Proxy(selector, eventHandler);
				}

				if (temp) {
					const modelGetter = {
						get: (model, key) => (...args) => {
							const state = model[key];
							if (!args.length) {
								return state;
							}

							const value = args[0];
							const inst = state();
							const originValue = Object
								.keys(value)
								.reduce((memo, key) => {
									memo[key] = inst[key];
									return memo;
								}, {});

							disposable.add(() => state(originValue, { source: 'model.proxy' }));
							return state(...args);
						}
					};

					return new Proxy(selector, modelGetter);
				}

				return selector;
			}
		};

		this.target = target;
		this.subject = new Proxy(target, modelHandler);
	}

	toString() {
		return this.target.toString ? this.target.toString() : JSON.stringify(this.toJSON());
	}

	toJSON() {
		return this.target.toJSON ? this.target.toJSON() : this.target;
	}
}
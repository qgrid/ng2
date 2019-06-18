import { clone } from '../utility/kit';

export class PersistenceService {
	constructor(model, createDefaultModel) {
		this.model = model;
		this.createDefaultModel = createDefaultModel;
	}

	save(settings) {
		const gridModel = this.model;
		settings = settings || gridModel.persistence().settings;

		const model = {};
		for (const key in settings) {
			const source = gridModel[key]();
			const target = {};
			model[key] = target;
			for (const p of settings[key]) {
				const value = source[p];
				target[p] = clone(value);
			}
		}

		return model;
	}

	load(model, settings) {
		const gridModel = this.model;
		settings = settings || gridModel.persistence().settings;

		for (let key in settings) {
			const source = model[key];
			if (source) {
				const target = gridModel[key];
				target(source, { source: 'persistence.service' });
			}
		}

		return model;
	}

	reset(settings) {
		const defaultModel = this.createDefaultModel();
		const gridModel = this.model;
		settings = settings || gridModel.persistence().settings;

		const model = {};
		for (let key in settings) {
			model[key] = {};
			const source = defaultModel[key];
			const target = gridModel[key];
			for (const p of settings[key]) {
				model[key][p] = source()[p];
			}
			target(model[key], { source: 'behavior.core' });
		}

		return model;
	}
}

export class PaginationView {
	constructor(model) {
		this.model = model;

		const triggers = model.pagination().resetTriggers;
		Object.keys(triggers)
			.forEach(name =>
				model[name + 'Changed']
					.on(e => {
						if (e.tag.behavior === 'core') {
							return;
						}

						if (model.scroll().mode === 'virtual') {
							return;
						}

						const trigger = triggers[name];
						for (const key of trigger) {
							if (e.hasChanges(key)) {
								model.pagination({ current: 0 }, { source: e.tag.source || 'pagination.view' });
							}
						}
					}));
	}

	get current() {
		return this.model.pagination().current;
	}

	get size() {
		return this.model.pagination().size;
	}
}
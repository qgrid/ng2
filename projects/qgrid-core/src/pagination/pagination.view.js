export class PaginationView {
	constructor(model) {
		this.model = model;

		const { resetTriggers } = model.pagination();
		Object.keys(resetTriggers)
			.forEach(name =>
				model[name + 'Changed']
					.on(e => {
						if (e.tag.behavior === 'core') {
							return;
						}

						if (model.scroll().mode === 'virtual') {
							return;
						}

						const trigger = resetTriggers[name];
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
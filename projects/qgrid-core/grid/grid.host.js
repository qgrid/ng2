
import { GridError } from '../infrastructure/error';
import { uniq, same } from '../utility/kit';
import { Keyboard } from '../keyboard/keyboard';

export class GridHost {
	constructor(host, plugin) {
		const { model, disposable, observe } = plugin;
		const { grid } = model;

		this.plugin = plugin;

		if (grid().status === 'bound') {
			throw new GridError(
				'grid.host',
				`Model is already used by grid "${grid().id}"`
			);
		}

		if (!host.id) {
			host.id = model.grid().id;
		}

		grid({
			status: 'bound'
		}, {
			source: 'grid.host'
		});

		this.invalidateVisibility();
		observe(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('column')) {
					this.invalidateVisibility();
				}
			});

		disposable.add(() =>
			model.grid({
				status: 'unbound'
			}, {
				source: 'grid.host'
			})
		);
	}

	invalidateVisibility() {
		const { model } = this.plugin;
		const { left, right } = model.scene().column.area;
		const { pinTop, pinBottom } = model.row();

		const { pin: oldPin } = model.visibility();
		const newPin = {
			left: left.length > 0,
			right: right.length > 0,
			top: pinTop.length > 0,
			bottom: pinBottom.length > 0
		};

		if (!same(oldPin, newPin)) {
			model.visibility({
				pin: newPin
			}, {
				source: 'grid.host'
			});
		}
	}
}


import { GridError } from '../infrastructure/error';
import { uniq, same } from '../utility/kit';
import { Keyboard } from '../keyboard/keyboard';

export class GridHost {
	constructor(host, plugin) {
		const { model, disposable, observe } = plugin;
		const { grid } = model;

		this.plugin = plugin;

		if (grid().status === 'bound') {
			throw new GridError('grid.host', `Model is already used by grid "${grid().id}"`);
		}

		if (!host.id) {
			host.id = model.grid().id;
		}

		grid({ status: 'bound' }, { source: 'grid.host' });

		this.invalidateVisibility();
		observe(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('column')) {
					this.invalidateVisibility();
				}
			});

		disposable.add(() => model.grid({ status: 'unbound' }, { source: 'grid.host' }));
	}

	keyUp(e) {
		const { model } = this.plugin;
		const { codes } = model.keyboard();
		const code = Keyboard.translate(e.keyCode);
		const index = codes.indexOf(code);
		if (index >= 0) {
			const newCodes = Array.from(codes);
			newCodes.splice(index, 1)
			model.keyboard({
				code,
				codes: newCodes,
				status: 'up'
			}, {
				source: 'key.up'
			});
		}

		model.keyboard({
			code: null,
			status: 'release'
		}, {
			source: 'key.up'
		});
	}

	keyDown(e, source = 'grid') {
		const { model } = this.plugin;
		const { shortcut } = model.action();

		const code = Keyboard.translate(e.keyCode);
		const result = shortcut.keyDown(e, source);
		if (result.length > 0) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			if (e.target.tagName === 'TBODY') {
				const { prevent } = model.navigation();
				if (prevent.has(code)) {
					e.preventDefault();
					e.stopPropagation();
				}
			}
		}

		model.keyboard({
			code,
			codes: uniq(model.keyboard().codes.concat(code)),
			status: 'down'
		}, {
			source: 'key.down'
		});

		return result;
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

	invalidateActive() {
		const { model, table, service } = this.plugin;
		if (table.view.isFocused()) {
			const needFocusCell =
				!model.mouse().target
				&& (model.focus().rowIndex < 0 || model.focus().columnIndex < 0);
			if (needFocusCell) {
				service.focus(
					model.pagination().size * model.pagination().current
				);
			} else {
				model.focus({
					isActive: true
				}, {
					source: 'grid.host'
				});
			}
		}
		else {
			model.focus({ isActive: false }, { source: 'grid.host' });
		}
	}
}

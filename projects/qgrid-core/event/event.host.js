
import {
	BLUR_COMMAND_KEY,
	HIGHLIGHT_CLEAR_COMMAND_KEY,
	KEY_DOWN_COMMAND_KEY,
	FOCUS_COMMAND_KEY,
	KEY_RELEASE_COMMAND_KEY,
	KEY_UP_COMMAND_KEY,
	MOUSE_DOWN_COMMAND_KEY,
	MOUSE_MOVE_COMMAND_KEY,
	MOUSE_UP_COMMAND_KEY
} from '../command-bag/command.bag';
import { eventPath } from '../services/dom';
import { getButtonCode } from '../mouse/mouse.code';
import { Keyboard } from '../keyboard/keyboard';
import { PathService } from '../path/path.service';
import { selectRowIndex, selectColumnIndex } from '../navigation/navigation.state.selector';

export class EventHost {

	constructor(host, plugin) {
		this.host = host;
		this.plugin = plugin;
	}

	keyUp(e) {
		const { commandPalette } = this.plugin;
		const code = Keyboard.translate(e.code);
		const keyUp = commandPalette.get(KEY_UP_COMMAND_KEY);
		if (keyUp.canExecute(code) === true) {
			keyUp.execute(code);
		}
	}

	keyDown(e) {
		const { model, commandPalette } = this.plugin;
		const code = Keyboard.translate(e.code);
		const keyDown = commandPalette.get(KEY_DOWN_COMMAND_KEY);
		if (keyDown.canExecute(code) === true) {
			if (keyDown.execute(code) === true) {
				this.stopPropagate(e);
				return true;
			}
		}

		// it can be a case when for instance user pressed pagedown and pageup
		// at the same time, to prevent default behavior we catch them here
		if (model.navigation().prevent.has(code)) {
			this.stopPropagate(e);
			return true;
		}	

		return false;
	}

	keyRelease() {
		const { commandPalette } = this.plugin;
		const keyRelease = commandPalette.get(KEY_RELEASE_COMMAND_KEY);
		if (keyRelease.canExecute() === true) {
			keyRelease.execute();
		}
	}

	mouseUp(e) {
		const { commandPalette } = this.plugin;
		const cell = this.findCell(e);
		const mouseUp = commandPalette.get(MOUSE_UP_COMMAND_KEY);
		const code = getButtonCode(e);
		if (mouseUp.canExecute([cell, code]) === true) {
			mouseUp.execute([cell, code]);
		}
	}

	mouseDown(e) {
		const { commandPalette } = this.plugin;
		const cell = this.findCell(e);
		const mouseDown = commandPalette.get(MOUSE_DOWN_COMMAND_KEY);
		const code = getButtonCode(e);
		if (mouseDown.canExecute([cell, code]) === true) {
			if (mouseDown.execute([cell, code]) === true) {
				e.preventDefault();
				e.stopImmediatePropagation();
				return true;
			};
		}

		return false;
	}

	mouseMove(e) {
		const { commandPalette } = this.plugin;
		const cell = this.findCell(e);
		const mouseMove = commandPalette.get(MOUSE_MOVE_COMMAND_KEY);
		if (mouseMove.canExecute(cell) === true) {
			mouseMove.execute(cell);
		}
	}

	mouseLeave() {
		const { commandPalette } = this.plugin;
		const clearHighlight = commandPalette.get(HIGHLIGHT_CLEAR_COMMAND_KEY);
		if (clearHighlight.canExecute() === true) {
			clearHighlight.execute();
		}
	}

	checkFocus() {
		const { table, commandPalette } = this.plugin;
		if (table.view.isFocused()) {
			const focus = commandPalette.get(FOCUS_COMMAND_KEY);
			if (focus.canExecute()) {
				focus.execute();
			}
		}
		else {
			const blur = commandPalette.get(BLUR_COMMAND_KEY);
			if (blur.canExecute()) {
				blur.execute();
			}
		}
	}

	findCell(e) {
		const { table, model } = this.plugin;
		const pathFinder = new PathService(table.box.bag.body);
		const path = eventPath(e);

		let cell = pathFinder.cell(path);
		if (!cell) {
			const firstElement = path[0];
			const isEditMarker =
				firstElement
				&& firstElement.classList.contains('q-grid-edit-marker');

			if (isEditMarker) {
				const rowIndex = selectRowIndex(model.navigation());
				const columnIndex = selectColumnIndex(model.navigation());
				cell = table.body.cell(rowIndex, columnIndex).model();
			}
		}

		return cell;
	}

	stopPropagate(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
	}
}

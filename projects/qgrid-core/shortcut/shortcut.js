import { Keyboard } from '../keyboard/keyboard';
import { isString } from '../utility/kit';
import { GridError } from '../infrastructure/error';

export const SHORTCUT_KEY_SEPARATOR = '+';
export const SHORTCUT_SEPARATOR = '|';

export class Shortcut {
	constructor(commandManager) {
		this.textCommands = new Map();
		this.regexpCommands = [];

		this.pressedKeys = [];
		this.commandManager = commandManager;
	}

	keyDown(event) {
		const key = this.getKey(event);
		if (this.pressedKeys.indexOf(key) < 0) {
			this.pressedKeys.push(key);
		}

		const shortcut = this.pressedKeys.join(SHORTCUT_KEY_SEPARATOR);
		const commands = this.findCommands(shortcut);
		if (commands.length) {
			const canRunCommands = this.commandManager.filter(commands);
			const stopPropagate = this.commandManager.invoke(canRunCommands);

			if (stopPropagate) {
				event.preventDefault();
				event.stopImmediatePropagation();
			}
		}

		return true;
	}

	keyUp(event) {
		const key = this.getKey(event);
		const index = this.pressedKeys.indexOf(key);
		this.pressedKeys.splice(index, 1);
	}

	register(command) {
		if (isString(command.shortcut)) {
			const shortcutList = this.parse(command.shortcut);
			shortcutList
				.forEach(shortcut => {
					if (this.textCommands.has(shortcut)) {
						const commands = this.textCommands.get(shortcut);
						if (commands.indexOf(command) >= 0) {
							throw new GridError(
								'shortcut',
								`Command ${command.key.name} is already registered`
							);
						}

						commands.push(command);
					} else {
						this.textCommands.set(shortcut, [command]);
					}
				});
		} else if (command.shortcut instanceof RegExp) {
			this.regexpCommands.push(command);
		}
	}

	unregister(command) {
		const regexpIndex = this.regexpCommands.indexOf(command);
		if (regexpIndex >= 0) {
			this.regexpCommands.splice(regexpIndex, 1);
			return;
		}

		const shortcutList = this.parse(command.shortcut);
		shortcutList
			.forEach(shortcut => {
				if (this.textCommands.has(shortcut)) {
					const commands = this.textCommands.get(shortcut);
					const index = commands.indexOf(command);
					if (index < 0) {
						throw new GridError(
							'shortcut.service',
							`Can't find command ${command.key.name} in the list`
						);
					}

					commands.splice(index, 1);
					if (!commands.length) {
						this.textCommands.delete(shortcut);
					}
				}
			});
	}

	reset() {
		this.pressedKeys = [];
	}

	findCommands(shortcut) {
		const commands = this.textCommands.get(shortcut) || [];
		const regexpCommands = this.regexpCommands.filter(cmd => cmd.shortcut.test(shortcut));
		return commands.concat(regexpCommands);
	}

	getKey(event) {
		return Keyboard.translate(event.code);
	}

	parse(shortcut) {
		return shortcut
			.split(SHORTCUT_SEPARATOR)
			.filter(part => !!part)
			.map(part => part
				.split(SHORTCUT_KEY_SEPARATOR)
				.filter(key => !!key)
				.join(SHORTCUT_KEY_SEPARATOR)
				.toLowerCase()
			);
	}
}

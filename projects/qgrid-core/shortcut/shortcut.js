import { Keyboard } from '../keyboard/keyboard';
import { isString, isFunction } from '../utility/kit';
import { GridError } from '../infrastructure/error';

export const SHORTCUT_KEY_SEPARATOR = '+';
export const SHORTCUT_SEPARATOR = '|';

export class Shortcut {
	constructor(commandManager) {
		this.textRefs = new Map();
		this.regexpRefs = [];
		this.funcRefs = [];

		this.pressedKeys = [];
		this.commandManager = commandManager;
	}

	keyDown(event) {
		const key = this.getKey(event);
		if (this.pressedKeys.indexOf(key) < 0) {
			this.pressedKeys.push(key);
		}

		const keys = this.pressedKeys.join(SHORTCUT_KEY_SEPARATOR);
		const commands = this.findCommands(keys);
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
		const type = this.getType(command.shortcut);
		switch (type) {
			case 'text': {
				const keysList = this.parse(command.shortcut);
				keysList
					.forEach(keys => {
						if (this.textRefs.has(keys)) {
							const commands = this.textRefs.get(keys);
							if (commands.indexOf(command) >= 0) {
								throw new GridError(
									'shortcut',
									`Command ${command.key.name} is already registered`
								);
							}

							commands.push(command);
						} else {
							this.textRefs.set(keys, [command]);
						}
					});
				break;
			}
			case 'regexp': {
				if(this.regexpRefs.indexOf(command) >= 0) {
					throw new GridError(
						'shortcut',
						`Command ${command.key.name} is already registered`
					);
				}

				this.regexpRefs.push(command);
				break;
			}
			case 'func': {
				if(this.funcRefs.indexOf(command) >= 0) {
					throw new GridError(
						'shortcut',
						`Command ${command.key.name} is already registered`
					);
				}

				this.funcRefs.push(command);
				break;
			}
		}
	}

	unregister(command) {
		const regexpIndex = this.regexpRefs.indexOf(command);
		if (regexpIndex >= 0) {
			this.regexpRefs.splice(regexpIndex, 1);
			return;
		}

		const keysList = this.parse(command.shortcut);
		keysList
			.forEach(keys => {
				if (this.textRefs.has(keys)) {
					const commands = this.textRefs.get(keys);
					const index = commands.indexOf(command);
					if (index < 0) {
						throw new GridError(
							'shortcut',
							`Can't find command ${command.key.name} in the list`
						);
					}

					commands.splice(index, 1);
					if (!commands.length) {
						this.textRefs.delete(keys);
					}
				}
			});
	}

	reset() {
		this.pressedKeys = [];
	}

	findCommands(keys) {
		const fromText = this.textRefs.get(keys) || [];
		const fromRegexp = this.regexpRefs.filter(cmd => cmd.shortcut.test(keys));
		const fromFunc = this.funcRefs.filter(cmd => {
			const shortcut = cmd.shortcut();
			const type = this.getType(shortcut);
			switch(type) {
				case 'text': {
					const keysList = this.parse(shortcut);
					return keysList.some(retKeys => retKeys === keys);
				}
				case 'regexp': {
					return shortcut.test(keys);
				}
			}

			return false;
		});

		return fromText.concat(fromRegexp).concat(fromFunc);
	}

	getKey(event) {
		return Keyboard.translate(event.code);
	}

	getType(shortcut) {
		if (isString(shortcut)) {
			return 'text';
		}

		if (shortcut instanceof RegExp) {
			return 'regexp';
		}

		if (isFunction(shortcut)) {
			return 'func';
		}

		return null;
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

import {Keyboard} from '../io/keyboard';

export class Shortcut {
	constructor(dispatcher) {
		this.dispatcher = dispatcher;
		this.keyCode = {
			key: null,
			code: null
		};
	}

	static isControl(keyCode) {
		if (!keyCode) {
			return false;
		}

		const code = keyCode.code;
		const parts = code.split('+');
		return parts.some(part => part === 'ctrl' || part === 'alt') ||
			parts.every(part => Keyboard.isControl(part));
	}

	static isPrintable(keyCode) {
		if (!keyCode) {
			return false;
		}

		const code = keyCode.code;
		const parts = code.split('+');
		return parts.some(part => Keyboard.isPrintable(part));
	}

	static stringify(keyCode) {
		if (!keyCode) {
			return '';
		}

		return Keyboard.stringify(keyCode.code, keyCode.key);
	}

	static translate(e) {
		const codes = [];
		const code = Keyboard.translate(e.keyCode).toLowerCase();
		if (e.ctrlKey) {
			codes.push('ctrl');
		}

		if (e.shiftKey) {
			codes.push('shift');
		}

		if (e.altKey) {
			codes.push('alt');
		}

		if (code !== 'ctrl' &&
			code !== 'shift' &&
			code !== 'alt') {
			codes.push(code);
		}

		return codes.join('+');
	}

	factory(manager) {
		const self = this;
		return {
			register: commands => self.register(manager, commands)
		};
	}

	keyDown(e, source) {
		const code = Shortcut.translate(e);
		this.keyCode = {
			key: e.key,
			code: code
		};

		return this.dispatcher.execute(code, source);
	}

	register(manager, commands) {
		return this.dispatcher.register(manager, commands);
	}
}

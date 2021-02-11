const codes = new Map()
	.set('bracketleft', '[')
	.set('bracketright', ']')
	.set('semicolon', ';')
	.set('minus', '-')
	.set('equal', '=')
	.set('period', '.')
	.set('slash', '/')
	.set('numpaddivide', 'numdivide')
	.set('numpadmultiply', 'nummultiply')
	.set('numpadsubtract', 'numsubtract')
	.set('numpadadd', 'numadd')
	.set('numpadenter', 'numenter')
	.set('numpaddecimal', 'numdecimal')
	.set('shiftleft', 'shift')
	.set('shiftright', 'shift')
	.set('controlleft', 'ctrl')
	.set('controlright', 'ctrl')
	.set('altleft', 'alt')
	.set('altright', 'alt')
	.set('arrowleft', 'left')
	.set('arrowup', 'up')
	.set('arrowright', 'right')
	.set('arrowdown', 'down')
	.set('backquote', '`')
	.set('escape', 'esc')
	.set('metaleft', '')
	.set('metaright', '')
	.set('contextmenu', '')
	.set('intlbackslash', '');

const controls = new Set([
	'shift',
	'ctrl',
	'alt',
	'pause',
	'break',
	'capslock',
	'esc',
	'insert',
	'left',
	'right',
	'end',
	'home',
	'pageup',
	'pagedown',
	'up',
	'down',
	'f1',
	'f2',
	'f3',
	'f4',
	'f5',
	'f6',
	'f7',
	'f8',
	'f9',
	'f10',
	'f11',
	'f12',
	'numlock',
	'scrolllock'
]);

const modifiers = new Set([
	'shift',
	'ctrl',
	'alt'
]);

const nonPrintableSet = new Set([
	'enter',
	'backspace',
	'tab',
	'capslock',
	'esc'
]);

const printableMap = new Map()
	.set('space', ' ');

export class Keyboard {
	static isPrintable(key) {
		return !nonPrintableSet.has(key) && !Keyboard.isControl(key);
	}

	static isControl(key) {
		return controls.has(key.toLowerCase());
	}

	static isModifier(key) {
		return modifiers.has(key.toLowerCase());
	}

	static stringify(key) {
		if (printableMap.has(key)) {
			return printableMap.get(key);
		}

		return key;
	}

	static translate(code) {
		if (!code) {
			return;
		}

		code = code.toLowerCase();
		return codes.get(code) || (
			code.startsWith('key') || code.startsWith('digit')
				? code.charAt(code.length - 1) : code
		);
	}
}

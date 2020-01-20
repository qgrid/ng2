const controlSet = new Set([
	'shift',
	'ctrl',
	'alt',
	'pause',
	'break',
	'capslock',
	'escape',
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

const nonPrintableSet = new Set([
	'enter'
]);

const codeMap = new Map()
	.set(8, 'backspace')
	.set(9, 'tab')
	.set(13, 'enter')
	.set(16, 'shift')
	.set(17, 'ctrl')
	.set(18, 'alt')
	.set(20, 'capslock')
	.set(27, 'escape')
	.set(32, 'space')
	.set(33, 'pageup')
	.set(34, 'pagedown')
	.set(35, 'end')
	.set(36, 'home')
	.set(37, 'left')
	.set(38, 'up')
	.set(39, 'right')
	.set(40, 'down')
	.set(45, 'insert')
	.set(46, 'delete')
	.set(96, 'numpad0')
	.set(97, 'numpad1')
	.set(98, 'numpad2')
	.set(99, 'numpad3')
	.set(100, 'numpad4')
	.set(101, 'numpad5')
	.set(102, 'numpad6')
	.set(103, 'numpad7')
	.set(104, 'numpad8')
	.set(105, 'numpad9')
	.set(112, 'f1')
	.set(113, 'f2')
	.set(114, 'f3')
	.set(115, 'f4')
	.set(116, 'f5')
	.set(117, 'f6')
	.set(118, 'f7')
	.set(119, 'f8')
	.set(120, 'f9')
	.set(121, 'f10')
	.set(122, 'f11')
	.set(123, 'f12')
	.set(144, 'numlock')
	.set(145, 'scrolllock');

const codeSet = new Set(codeMap.values());

const printableMap = new Map()
	.set('space', ' ');

export class Keyboard {
	static isPrintable(code) {
		return !nonPrintableSet.has(code) && !Keyboard.isControl(code);
	}

	static isControl(code) {
		return controlSet.has(code);
	}

	static stringify(code, key) {
		if (codeSet.has(code)) {
			return printableMap.get(code) || '';
		}

		return key;
	}

	static translate(code) {
		return codeMap.get(code) || String.fromCharCode(code);
	}
}


import { Injectable } from '@angular/core';

const codes = new Map()
	.set('BracketLeft', '[')
	.set('BracketRight', ']')
	.set('Semicolon', ';')
	.set('Minus', '-')
	.set('Equal', '=')
	.set('Period', '.')
	.set('Slash', '/')
	.set('NumpadDivide', 'numdivide')
	.set('NumpadMultiply', 'nummultiply')
	.set('NumpadSubtract', 'numsubtract')
	.set('NumpadAdd', 'numadd')
	.set('NumpadEnter', 'numenter')
	.set('NumpadDecimal', 'numdecimal')
	.set('ShiftLeft', 'shift')
	.set('ShiftRight', 'shift')
	.set('ControlLeft', 'ctrl')
	.set('ControlRight', 'ctrl')
	.set('AltLeft', 'alt')
	.set('AltRight', 'alt')
	.set('ArrowLeft', 'left')
	.set('ArrowUp', 'up')
	.set('ArrowRight', 'right')
	.set('ArrowDown', 'down')
	.set('Numpad0', 'numpad0')
	.set('Numpad1', 'numpad1')
	.set('Numpad2', 'numpad2')
	.set('Numpad3', 'numpad3')
	.set('Numpad4', 'numpad4')
	.set('Numpad5', 'numpad5')
	.set('Numpad6', 'numpad6')
	.set('Numpad7', 'numpad7')
	.set('Numpad8', 'numpad8')
	.set('Numpad9', 'numpad9')
	.set('F1', 'f1')
	.set('F2', 'f2')
	.set('F3', 'f3')
	.set('F4', 'f4')
	.set('F5', 'f5')
	.set('F6', 'f6')
	.set('F7', 'f7')
	.set('F8', 'f8')
	.set('F9', 'f9')
	.set('F10', 'f10')
	.set('F11', 'f11')
	.set('F12', 'f12')
	.set('Pause', 'pause')
	.set('Quote', 'quote')
	.set('Backquote', '`')
	.set('Backslash', 'backslash')
	.set('Backspace', 'backspace')
	.set('Tab', 'tab')
	.set('Enter', 'enter')
	.set('CapsLock', 'capslock')
	.set('Escape', 'esc')
	.set('Space', 'space')
	.set('PageUp', 'pageup')
	.set('PageDown', 'pagedown')
	.set('End', 'end')
	.set('Home', 'home')
	.set('Insert', 'insert')
	.set('Delete', 'delete')
	.set('NumLock', 'numlock')
	.set('ScrollLock', 'scrolllock')
	.set('Comma', 'comma')
	.set('MetaLeft', '')
	.set('MetaRight', '')
	.set('ContextMenu', '')
	.set('IntlBackslash', '');

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

export class Keyboard {
	static isControlKey(key) {
		return controls.has(key.toLowerCase());
	}

	static isModifier(key) {
		return modifiers.has(key.toLowerCase());
	}

	static stringify(code) {
		const key = Keyboard.translate(code);
		if (codeSet.has(code)) {
			return printableMap.get(code) || '';
		}

		return key;
	}

	static translate(code) {
		if (!code) {
			return;
		}
		return codes.get(code) || (
			code.startsWith('Key') || code.startsWith('Digit')
				? code.charAt(code.length - 1).toLowerCase() : ''
		);
	}
}

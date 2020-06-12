import { Injectable } from '@angular/core';

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
	.set('numpad0', 'numpad0')
	.set('numpad1', 'numpad1')
	.set('numpad2', 'numpad2')
	.set('numpad3', 'numpad3')
	.set('numpad4', 'numpad4')
	.set('numpad5', 'numpad5')
	.set('numpad6', 'numpad6')
	.set('numpad7', 'numpad7')
	.set('numpad8', 'numpad8')
	.set('numpad9', 'numpad9')
	.set('f1', 'f1')
	.set('f2', 'f2')
	.set('f3', 'f3')
	.set('f4', 'f4')
	.set('f5', 'f5')
	.set('f6', 'f6')
	.set('f7', 'f7')
	.set('f8', 'f8')
	.set('f9', 'f9')
	.set('f10', 'f10')
	.set('f11', 'f11')
	.set('f12', 'f12')
	.set('pause', 'pause')
	.set('quote', 'quote')
	.set('backquote', '`')
	.set('backslash', 'backslash')
	.set('backspace', 'backspace')
	.set('tab', 'tab')
	.set('enter', 'enter')
	.set('capslock', 'capslock')
	.set('escape', 'esc')
	.set('space', 'space')
	.set('pageup', 'pageup')
	.set('pagedown', 'pagedown')
	.set('end', 'end')
	.set('home', 'home')
	.set('insert', 'insert')
	.set('delete', 'delete')
	.set('numlock', 'numlock')
	.set('scrolllock', 'scrolllock')
	.set('comma', 'comma')
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
		if (codes.has(key)) {
			return printableMap.get(key) || '';
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
				? code.charAt(code.length - 1) : ''
		);
	}
}

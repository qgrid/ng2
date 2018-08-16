import {Shortcut} from './shortcut';
import {ShortcutDispatcher} from './shortcut.dispatcher';
import {CommandManager} from './../command/command.manager';
import {Command} from '../command/command';

describe('Shortcut', () => {
	let shortcutDispatcher = new ShortcutDispatcher();
	let shortcut = new Shortcut(shortcutDispatcher);
	let manager = new CommandManager();
	let command1 = new Command();
	command1.shortcut = 'ctrl|shift';
	let command2 = new Command();
	command2.shortcut = () => 'alt|space';
	let command3 = new Command();
	command3.shortcut = () => 'enter|tab';
	let cmds = [command1, command2, command3];

	let someKeyCode = {
		code: 'alt+a+b+c+ctrl'
	};
	let everyKeyCode = {
		code: 'space+ctrl+f11'
	};
	let incorrectCode = {
		code: 'enter+a+b'
	};
	let nonPrintableCode = {
		code: 'enter+pagedown'
	};
	let keyCodeThatExist = {
		code: 'delete',
		key: 46
	};
	let keyCodeThatDoesntExist = {
		code: 'deleeete',
		key: 257
	};
	let event = {
		keyCode: 27,
		ctrlKey: true
	};
	let eventA = {
		keyCode: 65,
		shiftKey: true
	};
	let shiftCtrl = {
		keyCode: 16,
		shiftKey: 'shift'
	};

	describe('isControl', () => {
		it('should return true', () => {
			let result = Shortcut.isControl(someKeyCode);
			expect(result).to.equal(true);
		});
		it('should return true', () => {
			let result = Shortcut.isControl(everyKeyCode);
			expect(result).to.equal(true);
		});
		it('should return false if passed incorrect string', () => {
			let result = Shortcut.isControl(incorrectCode);
			expect(result).to.equal(false);
		});
		it('should return false if no arguments are specified', () => {
			let result = Shortcut.isControl();
			expect(result).to.equal(false);
		});
	});

	describe('isPrintable', () => {
		it('should return true', () => {
			let result = Shortcut.isPrintable(everyKeyCode);
			expect(result).to.equal(true);
		});
		it('should return false', () => {
			let result = Shortcut.isPrintable(nonPrintableCode);
			expect(result).to.equal(false);
		});
		it('should return false if no arguments are specified', () => {
			let result = Shortcut.isPrintable();
			expect(result).to.equal(false);
		});
	});

	describe('stringify', () => {
		it('should return an empty string', () => {
			let result = Shortcut.stringify(keyCodeThatExist);
			expect(result).to.equal('');
		});
		it('should return a key', () => {
			let result = Shortcut.stringify(keyCodeThatDoesntExist);
			expect(result).to.equal(257);
		});
	});

	describe('translate', () => {
		it('should translate keyCode to a string by using codemap set', () => {
			let result = Shortcut.translate(event);
			expect(result).to.equal('ctrl+escape');
		});
		it('should translate keyCode to a string by using String.fromCharCode', () => {
			let result = Shortcut.translate(eventA);
			expect(result).to.equal('shift+a');
		});
	});

	describe('factory/register/keyDown', () => {
		it('should return true if shortcut was registered and executed', () => {
			shortcut.register(manager,cmds);
			let executeResult = shortcut.keyDown(shiftCtrl).length > 0;
			expect(executeResult).to.equal(true);
		});
	});
});


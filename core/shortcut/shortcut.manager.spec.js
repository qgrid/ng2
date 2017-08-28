import {ShortcutManager} from './shortcut.manager';
import {Command} from '../command/command';
import {CommandManager} from './../command/command.manager';

describe('ShortcutManager', () => {
	let manager = new CommandManager();
	let command1 = new Command();
	command1.shortcut = 'ctrl|escape';
	let command2 = new Command();
	command2.shortcut = () => 'alt|shift';
	let command3 = new Command();
	command3.shortcut = () => 'enter|tab';
	let cmds = [command1, command2, command3];
	let shortcutManager = new ShortcutManager();

	describe('execute', () => {
		it('should return 1 if shortcut was registered and executed', () => {
			shortcutManager.register(manager, cmds);
			let result = shortcutManager.execute('ctrl');
			expect(result).to.equal(1);
		});

		it('should return false if shortcut was not found', () => {
			let result = shortcutManager.execute('deleeete');
			expect(result).to.equal(false);
		});
	});

	describe('test', () => {
		it('should return true if shortcut contains * symbol', () => {
			expect(shortcutManager.test('*|ctrl', '')).to.equal(true);
		});
		it('should return true if shortcut equals code ', () => {
			expect(shortcutManager.test('ctrl|shift', 'ctrl')).to.equal(true);
		});
		it('should return false otherwise', () => {
			expect(shortcutManager.test('ctrl|shift', 'space')).to.equal(false);
		});
	});
});

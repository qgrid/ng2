import {ShortcutDispatcher} from './shortcut.dispatcher';
import {Command} from '../command/command';
import {CommandManager} from './../command/command.manager';

describe('ShortcutDispatcher', () => {
	let manager = new CommandManager();
	let command1 = new Command();
	command1.shortcut = 'ctrl|escape';
	let command2 = new Command();
	command2.shortcut = () => 'alt|shift';
	let command3 = new Command();
	command3.shortcut = () => 'enter|tab';
	let cmds = [command1, command2, command3];
	let shortcutDispatcher = new ShortcutDispatcher();

	describe('execute', () => {
		it('should return true if shortcut was registered and executed', () => {
			shortcutDispatcher.register(manager, cmds);
			let result = shortcutDispatcher.execute('ctrl').length > 0;
			expect(result).to.equal(true);
		});

		it('should return false if shortcut was not found', () => {
			let result = shortcutDispatcher.execute('deleeete').length > 0;
			expect(result).to.equal(false);
		});
	});

	describe('test', () => {
		it('should return true if shortcut contains * symbol', () => {
			expect(shortcutDispatcher.test('*|ctrl', '')).to.equal(true);
		});
		it('should return true if shortcut equals code ', () => {
			expect(shortcutDispatcher.test('ctrl|shift', 'ctrl')).to.equal(true);
		});
		it('should return false otherwise', () => {
			expect(shortcutDispatcher.test('ctrl|shift', 'space')).to.equal(false);
		});
	});
});

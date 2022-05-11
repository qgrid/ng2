import { Command } from '../command/command';
import { CommandManager } from './../command/command.manager';
import { ShortcutDispatcher } from './shortcut.dispatcher';

describe('ShortcutDispatcher', () => {
  const manager = new CommandManager();
  const command1 = new Command();
  command1.shortcut = 'ctrl|escape';
  const command2 = new Command();
  command2.shortcut = () => 'alt|shift';
  const command3 = new Command();
  command3.shortcut = () => 'enter|tab';
  const cmds = [
    command1,
    command2,
    command3,
  ];
  const shortcutDispatcher = new ShortcutDispatcher();

  describe('execute', () => {
    it('should return true if shortcut was registered and executed', () => {
      shortcutDispatcher.register(manager, cmds);
      const result = shortcutDispatcher.execute('ctrl').length > 0;
      expect(result).to.equal(true);
    });

    it('should return false if shortcut was not found', () => {
      const result = shortcutDispatcher.execute('deleeete').length > 0;
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

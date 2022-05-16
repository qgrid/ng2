import { Command } from '../command/command';
import { CommandManager } from './../command/command.manager';
import { Shortcut } from './shortcut';
import { ShortcutDispatcher } from './shortcut.dispatcher';

describe('Shortcut', () => {
  const shortcutDispatcher = new ShortcutDispatcher();
  const shortcut = new Shortcut(shortcutDispatcher);
  const manager = new CommandManager();
  const command1 = new Command();
  command1.shortcut = 'ctrl|shift';
  const command2 = new Command();
  command2.shortcut = () => 'alt|space';
  const command3 = new Command();
  command3.shortcut = () => 'enter|tab';
  const cmds = [
    command1,
    command2,
    command3,
  ];

  const someKeyCode = {
    code: 'alt+a+b+c+ctrl',
  };
  const everyKeyCode = {
    code: 'space+ctrl+f11',
  };
  const incorrectCode = {
    code: 'enter+a+b',
  };
  const nonPrintableCode = {
    code: 'enter+pagedown',
  };
  const keyCodeThatExist = {
    code: 'delete',
    key: 46,
  };
  const keyCodeThatDoesntExist = {
    code: 'deleeete',
    key: 257,
  };
  const event = {
    keyCode: 27,
    ctrlKey: true,
  };
  const eventA = {
    keyCode: 65,
    shiftKey: true,
  };
  const shiftCtrl = {
    keyCode: 16,
    shiftKey: 'shift',
  };

  describe('isControl', () => {
    it('should return true', () => {
      const result = Shortcut.isControl(someKeyCode);
      expect(result).to.equal(true);
    });
    it('should return true', () => {
      const result = Shortcut.isControl(everyKeyCode);
      expect(result).to.equal(true);
    });
    it('should return false if passed incorrect string', () => {
      const result = Shortcut.isControl(incorrectCode);
      expect(result).to.equal(false);
    });
    it('should return false if no arguments are specified', () => {
      const result = Shortcut.isControl();
      expect(result).to.equal(false);
    });
  });

  describe('isPrintable', () => {
    it('should return true', () => {
      const result = Shortcut.isPrintable(everyKeyCode);
      expect(result).to.equal(true);
    });
    it('should return false', () => {
      const result = Shortcut.isPrintable(nonPrintableCode);
      expect(result).to.equal(false);
    });
    it('should return false if no arguments are specified', () => {
      const result = Shortcut.isPrintable();
      expect(result).to.equal(false);
    });
  });

  describe('stringify', () => {
    it('should return an empty string', () => {
      const result = Shortcut.stringify(keyCodeThatExist);
      expect(result).to.equal('');
    });
    it('should return a key', () => {
      const result = Shortcut.stringify(keyCodeThatDoesntExist);
      expect(result).to.equal(257);
    });
  });

  describe('translate', () => {
    it('should translate keyCode to a string by using codemap set', () => {
      const result = Shortcut.translate(event);
      expect(result).to.equal('ctrl+escape');
    });
    it('should translate keyCode to a string by using String.fromCharCode', () => {
      const result = Shortcut.translate(eventA);
      expect(result).to.equal('shift+a');
    });
  });

  describe('factory/register/keyDown', () => {
    it('should return true if shortcut was registered and executed', () => {
      shortcut.register(manager,cmds);
      const executeResult = shortcut.keyDown(shiftCtrl).length > 0;
      expect(executeResult).to.equal(true);
    });
  });
});

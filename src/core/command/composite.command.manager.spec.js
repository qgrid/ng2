import {CompositeCommandManager} from './composite.command.manager';
import {CommandManager} from './command.manager'

describe('CompositeCommandManager', () => {
	let commands = [],
		i = 5,
		arr = [];

	while (i > 0) {
		if (i % 2 === 0) {
			commands.push({
				execute: () => arr.push(1),
				canExecute: () => true
			});
		} else {
			commands.push({
				execute: () => arr.push(2),
				canExecute: () => false
			});
		}
		i--;
	}

	describe('invoke', () => {
		it('should invoke each command', () => {
			let commandManager = new CommandManager();
			let compositeCommandManager = new CompositeCommandManager(commandManager);
			compositeCommandManager.invoke(commands);
			expect(arr.join(',')).to.equal('2,1,2,1,2');
		});
	});

	describe('filter', () => {
		it('should return filtered commands', () => {
			let commandManager = new CommandManager();
			let compositeCommandManager = new CompositeCommandManager(commandManager);
			let filtered = compositeCommandManager.filter(commands);
			expect(filtered.length).to.equal(2);
		});
	});

});

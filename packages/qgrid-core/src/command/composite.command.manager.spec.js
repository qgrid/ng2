import { CommandManager } from './command.manager';
import { CompositeCommandManager } from './composite.command.manager';

describe('CompositeCommandManager', () => {
	const commands = [];
	const arr = [];
	let i = 5;

	while (i > 0) {
		if (i % 2 === 0) {
			commands.push({
				execute: () => arr.push(1),
				canExecute: () => true,
			});
		} else {
			commands.push({
				execute: () => arr.push(2),
				canExecute: () => false,
			});
		}
		i--;
	}

	describe('invoke', () => {
		it('should invoke each command', () => {
			const commandManager = new CommandManager();
			const compositeCommandManager = new CompositeCommandManager(commandManager);
			compositeCommandManager.invoke(commands);
			expect(arr.join(',')).to.equal('2,1,2,1,2');
		});
	});

	describe('filter', () => {
		it('should return filtered commands', () => {
			const commandManager = new CommandManager();
			const compositeCommandManager = new CompositeCommandManager(commandManager);
			const filtered = compositeCommandManager.filter(commands);
			expect(filtered.length).to.equal(2);
		});
	});

});

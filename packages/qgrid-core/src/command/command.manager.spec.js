import { CommandManager } from './command.manager';

describe('CommandManager', () => {
	const arrayOfCommands = [];
	const arr = [];
	let i = 5;

	while (i > 0) {
		if (i % 2 === 0) {
			arrayOfCommands.push({
				execute: () => arr.push(1),
				canExecute: () => true,
			});
		} else {
			arrayOfCommands.push({
				execute: () => arr.push(2),
				canExecute: () => false,
			});
		}
		i--;
	}

	describe('invoke', () => {
		it('should invoke each command', () => {
			const commandManager = new CommandManager();
			commandManager.invoke(arrayOfCommands);
			expect(arr.join(',')).to.equal('2,1,2,1,2');
		});
	});

	describe('filter', () => {
		it('should return filtered commands', () => {
			const commandManager = new CommandManager();
			const filtered = commandManager.filter(arrayOfCommands);
			expect(filtered.length).to.equal(2);
		});
	});

});

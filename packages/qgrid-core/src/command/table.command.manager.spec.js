import { TableCommandManager } from './table.command.manager';

describe('CompositeCommandManager', () => {
	const commands = [];
	const arr = [];
	const tableWithFocus = {view: {isFocused: () => true}};
	const tableWithoutFocus = {view: {isFocused: () => false}};
	const apply = f => f();
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

	describe('filter', () => {
		it('should return filtered commands if ViewActive = true', () => {
			const tableCommandManager = new TableCommandManager(apply, tableWithFocus);
			const filtered = tableCommandManager.filter(commands);
			expect(filtered.length).to.equal(2);
		});

		it('should return empty array if ViewActive = false', () => {
			const tableCommandManager = new TableCommandManager(apply, tableWithoutFocus);
			const filtered = tableCommandManager.filter(commands);
			expect(filtered.length).to.equal(0);
		});
	});

});

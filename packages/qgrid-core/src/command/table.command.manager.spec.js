import { TableCommandManager } from './table.command.manager';

describe('CompositeCommandManager', () => {
	const commands = [],
		i = 5,
		arr = [],
		tableWithFocus = {view: {isFocused: () => true}},
		tableWithoutFocus = {view: {isFocused: () => false}},
		apply = f => f();

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

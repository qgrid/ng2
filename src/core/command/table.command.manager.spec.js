import {TableCommandManager} from './table.command.manager';

describe('CompositeCommandManager', () => {
	let commands = [],
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
			let tableCommandManager = new TableCommandManager(apply, tableWithFocus);
			let filtered = tableCommandManager.filter(commands);
			expect(filtered.length).to.equal(2);
		});

		it('should return empty array if ViewActive = false', () => {
			let tableCommandManager = new TableCommandManager(apply, tableWithoutFocus);
			let filtered = tableCommandManager.filter(commands);
			expect(filtered.length).to.equal(0);
		});
	});

});


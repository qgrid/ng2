import { CommandManager } from '../command/command.manager';
import { GroupLet } from './group.let';
import { modelFactory } from '../test/model.factory';
import { GridService } from '../grid/grid.service';

describe('GroupLet', () => {
	let node;
	let table = {
		data: {
			columns: () =>
				[{
					key: 'id', type: null
				}]
		}
	};
	let model = modelFactory();
	let gridService = new GridService(model);
	let commandManager = new CommandManager();
	const { shortcut } = model.action();
	const navShortcut = {
		register: commands => {
			shortcut.register(commandManager, commands);
		},
		keyCode: () => shortcut.keyCode
	};
	let groupView = new GroupLet(model, table, gridService, navShortcut);

	beforeEach('reset node', () => {
		node = {
			children: [1,2,3,4,5],
			state: {
				expand: true
			},
			level: 2,
			key: 'name',
			type: 'group'
		};
	});

	describe('toggleStatus', () => {
		it('execute() should toggle node.state', () => {
			let command = groupView.toggleStatus;
			command.execute([node]);
			let result = groupView.status(node);
			expect(result).to.equal('collapse');
			command.execute([node]);
			result = groupView.status(node);
			expect(result).to.equal('expand');
		});

		it('should return true if canExecute', () => {
			let command = groupView.toggleStatus;
			let result = command.canExecute([node]);
			expect(result).to.equal(true);
		});

		it('should return false if can`tExecute', () => {
			delete node.type;
			let command = groupView.toggleStatus;
			let result = command.canExecute([node]);
			expect(result).to.equal(false);
		});
	});

	describe('count', () => {
		it('should return length of node.children or node.rows', () => {
			let result = groupView.count(node);
			expect(result).to.equal(5);
		});
	});

	describe('status', () => {
		it('should return status', () => {
			let result = groupView.status(node);
			expect(result).to.equal('expand');
		});
	});

	describe('offset', () => {
		it('should return offset', () => {
			const column = {
				key: 'id',
				offset: 24
			};
			let table = {
				data: {
					columns: () => [column]
				}
			};
			let gridService = new GridService(model);
			let groupView = new GroupLet(model, table, gridService, navShortcut);
			let result = groupView.offset(node, column);
			expect(result).to.equal(48); // model.offset = 24(optional value) * node.level = 2 == 48
		});
	});
});

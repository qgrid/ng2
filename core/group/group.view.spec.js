import {CommandManager} from '../command/command.manager';
import {GroupView} from './group.view';
import {modelFactory} from '../test/model.factory';
import {GridService} from '../services/grid';
import {GroupColumnModel} from '../column-type/group.column';

describe('Group View', () => {
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
	let groupView = new GroupView(model, table, commandManager, gridService);

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
			command.execute(node);
			let result = groupView.status(node);
			expect(result).to.equal('collapse');
			command.execute(node);
			result = groupView.status(node);
			expect(result).to.equal('expand');
		});

		it('should return true if canExecute', () => {
			let command = groupView.toggleStatus;
			let result = command.canExecute(node);
			expect(result).to.equal(true);
		});

		it('should return false if can`tExecute', () => {
			delete node.type;
			let command = groupView.toggleStatus;
			let result = command.canExecute(node);
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

			let table = {
				data: {
					columns: () =>
						[{
							key: 'id', type: null
						}]
				}
			};
			let gridService = new GridService(model);
			let groupView = new GroupView(model, table, commandManager, gridService);
			let result = groupView.offset(node);
			expect(result).to.equal(48); // model.offset = 24(optional value) * node.level = 2 == 48
		});
	});

	describe('value', () => {
		it('should return value', () => {

			let table = {
				data: {
					columns: () =>
						[{
							key: 'id', type: null
						}]
				}
			};
			let gridService = new GridService(model);
			let groupView = new GroupView(model, table, commandManager, gridService);
			let result = groupView.value(node);
			expect(result).to.equal('name');
		});
	});

	describe('get column', () => {
		it('should return column with type `group`', () => {

			let table = {
				data: {
					columns: () =>
						[{
							key: 'id', type: 'group'
						}]
				}
			};
			let gridService = new GridService(model);
			let groupView = new GroupView(model, table, commandManager, gridService);
			let result = groupView.column;
			expect(result.key).to.equal('id');
		});
		it('otherwise should return a GroupColumnModel instance', () => {

			let table = {
				data: {
					columns: () =>
						[{
							key: 'id', type: null
						}]
				}
			};
			let gridService = new GridService(model);
			let groupView = new GroupView(model, table, commandManager, gridService);
			let result = groupView.column;
			expect(result).to.be.an.instanceOf(GroupColumnModel);
		});
	});
});

import {columnFactory} from './column.factory';
import {modelFactory} from '../test/model.factory';
import {PasswordColumn} from '../column-type/password.column';
import {ColumnView as CustomColumn} from '../scene/view/column.view';
import {Command} from '../command/command';

describe('columnFactory', () => {
	let model = modelFactory();
	let body = {title: 'pass', pin: 'left'};

	it('should create a new instance of PasswordColumn', () => {
		let createColumn = columnFactory(model);
		let result = createColumn('password');
		expect(result).to.be.an.instanceOf(PasswordColumn);
	});

	it('should create a new instance of CustomColumn if there is no such type in the ColumnType list', () => {
		let createColumn = columnFactory(model);
		let result = createColumn('someColumn');
		expect(result).to.be.an.instanceOf(CustomColumn);
	});

	it('should set values to column`s model if body is specified', () => {
		let createColumn = columnFactory(model);
		let result = createColumn('password', body);
		expect(result.model.title).to.equal('pass');
		expect(result.model.pin).to.equal('left');
		expect(result.model.type).to.equal('password');
		expect(result.model.key).to.equal(null);
		expect(result.model.value).to.equal(null);
		expect(result.model.label).to.equal(null);
		expect(result.model.path).to.equal(null);
		expect(result.model.origin).to.equal('specific');
		expect(result.model.source).to.equal('user');
		expect(result.model.category).to.equal('data');
		expect(result.model.editor).to.equal(null);
		expect(result.model.editorOptions.trigger).to.equal('click');
		expect(result.model.editorOptions.label).to.equal(null);
		expect(result.model.editorOptions.value.name).to.equal('identity');
		expect(result.model.editorOptions.actions.length).to.equal(0);
		expect(result.model.width).to.equal(null);
		expect(result.model.minWidth).to.equal(20);
		expect(result.model.maxWidth).to.equal(null);
		expect(result.model.canEdit).to.equal(true);
		expect(result.model.canResize).to.equal(true);
		expect(result.model.canSort).to.equal(false);
		expect(result.model.canMove).to.equal(true);
		expect(result.model.canFilter).to.equal(false);
		expect(result.model.canHighlight).to.equal(true);
		expect(result.model.canFocus).to.equal(true);
		expect(result.model.canFocus).to.equal(true);
		expect(result.model.isVisible).to.equal(true);
		expect(result.model.index).to.equal(-1);
		expect(result.model.$label).to.equal(null);
		expect(result.model.$value).to.equal(null);
	});
});

import { sortPipe as sort } from './sort.pipe';
import { compare } from '../utility/kit';
import { modelFactory } from '../test/model.factory';

describe('sort pipe', () => {
	let model;

	const list = [{
		name: 'Bob',
		age: 45
	}, {
		name: 'Alan',
		age: 30
	}, {
		name: 'James',
		age: 40
	}, {
		name: 'Bob',
		age: 40
	}];

	const columnList = {
		line: [{
			key: 'name',
			compare
		}, {
			key: 'age',
			compare
		}]
	};

	const valueFactory = column => row => row[column.key];

	beforeEach(() => {
		model = modelFactory();
		model.columnList(columnList);
	});

	it('should sort by asc', () => {
		model.sort({ by: [{ name: 'asc' }] });
		let ctx = {
			valueFactory: valueFactory,
			model
		};

		sort(list, ctx, (data) => {
			expect(data[0].name).to.be.equal('Alan');
			expect(data[1].name).to.be.equal('Bob');
			expect(data[2].name).to.be.equal('Bob');
			expect(data[3].name).to.be.equal('James');
		});
	});

	it('should sort by desc', () => {
		model.sort({ by: [{ name: 'desc' }] });
		let ctx = {
			valueFactory: valueFactory,
			model
		};

		sort(list, ctx, (data) => {
			expect(data[0].name).to.be.equal('James');
			expect(data[1].name).to.be.equal('Bob');
			expect(data[2].name).to.be.equal('Bob');
			expect(data[3].name).to.be.equal('Alan');

		});
	});

	it('should sort by asc then by desc', () => {
		model.sort({ by: [{ name: 'asc' }, { age: 'desc' }] });
		let ctx = {
			valueFactory: valueFactory,
			model
		};

		sort(list, ctx, data => {
			expect(data[0]).to.be.eql({ name: 'Alan', age: 30 });
			expect(data[1]).to.be.eql({ name: 'Bob', age: 45 });
			expect(data[2]).to.be.eql({ name: 'Bob', age: 40 });
			expect(data[3]).to.be.eql({ name: 'James', age: 40 });
		});
	});

	it('should sort by desc then by asc', () => {
		model.sort({ by: [{ name: 'desc' }, { age: 'asc' }] });
		let ctx = {
			valueFactory: valueFactory,
			model
		};

		sort(list, ctx, (data) => {
			expect(data[0]).to.be.eql({ name: 'James', age: 40 });
			expect(data[1]).to.be.eql({ name: 'Bob', age: 40 });
			expect(data[2]).to.be.eql({ name: 'Bob', age: 45 });
			expect(data[3]).to.be.eql({ name: 'Alan', age: 30 });
		});
	});
});

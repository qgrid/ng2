import {FakeTable} from './table';

describe('FakeTable', () => {
	let fakeTable = new FakeTable();

	it('rows should be an empty array', () => {
		expect(fakeTable.rows.length).to.equal(0);
	});
});

import { FakeTable } from './table';

describe('FakeTable', () => {
	const fakeTable = new FakeTable();

	it('rows should be an empty array', () => {
		expect(fakeTable.rows.length).to.equal(0);
	});
});

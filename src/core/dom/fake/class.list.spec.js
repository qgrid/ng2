import {FakeClassList} from './class.list';

describe('FakeClassList', () => {
	let fakeClassList = new FakeClassList();

	describe('add', () => {
		it('should be undefined', () => {
			expect(fakeClassList.add()).to.equal(undefined);
		});
	});

	describe('remove', () => {
		it('should be undefined', () => {
			expect(fakeClassList.remove()).to.equal(undefined);
		});
	});

});

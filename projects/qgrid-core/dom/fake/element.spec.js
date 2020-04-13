import {FakeElement} from './element';

describe('Element', () => {
	let testRect = {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		width: 0,
		height: 0
	};

	let fakeElement = new FakeElement();

	describe('getBoundingClientRect', () => {
		let rect = fakeElement.getBoundingClientRect();
		it('should return rect that has properties = 0', () => {
			expect(JSON.stringify(rect)).to.equal(JSON.stringify(testRect));
		});
	});

	describe('clientWidth', () => {
		let width = fakeElement.clientWidth;
		it('get width = 0', () => {
			expect(width).to.equal(0);
		});
	});

	describe('clientHeight', () => {
		let height = fakeElement.clientHeight;
		it('get height = 0', () => {
			expect(height).to.equal(0);
		});
	});
});

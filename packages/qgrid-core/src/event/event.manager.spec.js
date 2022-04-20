import { EventManager } from './event.manager';

describe('EventManager', () => {

	const test = {
		arr: [1, 2, 3],
		checkLength: function () {
			return this.arr.length;
		}
	};

	const test2 = {
		arr: [1, 2, 3, 4, 5]
	};

	const eventManager = new EventManager(test2);
	const result = eventManager.bind(test.checkLength);

	describe('bind', () => {

		it('should return 5 if checkLength method was bound to test2 object', () => {
			expect(result()).to.equal(5);
		});

	});
});

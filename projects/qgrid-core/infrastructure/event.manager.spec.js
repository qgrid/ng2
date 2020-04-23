import {EventManager} from './event.manager';

describe('EventManager', () => {

	let test = {
		arr: [1, 2, 3],
		checkLength: function () {
			return this.arr.length;
		}
	};

	let test2 = {
		arr: [1, 2, 3, 4, 5]
	};

	let eventManager = new EventManager(test2);
	let result = eventManager.bind(test.checkLength);

	describe('bind', () => {

		it('should return 5 if checkLength method was bound to test2 object', () => {
			expect(result()).to.equal(5);
		});

	});
	
});



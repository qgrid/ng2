import {EventListener} from './event.listener';
import {EventManager} from './event.manager';

describe('Event', () => {
	let input;
	let eventListener;

	beforeEach(() => {
		input = document.createElement('input');
		eventListener = new EventListener(input, new EventManager(this));
	});

	describe('on', () => {

		it('should return true if eventListener was attached to element', () => {
			eventListener.on('click', () => input.classList.add('someClass'));
			input.click();

			expect(input.classList.contains('someClass')).to.equal(true);
		});

		it('should return false if eventListener was detached from element', () => {
			let result = eventListener.on('click', () => input.classList.add('someClass'));
			result();
			input.click();

			expect(input.classList.contains('someClass')).to.equal(false);
		});
	});

	describe('off', () => {

		it('should return false if all eventListeners were detached from element', () => {
			eventListener.on('click', () => input.classList.add('someClass'));
			eventListener.on('click', () => input.classList.add('someAnotherClass'));
			eventListener.off();
			input.click();

			expect(input.classList.contains('someClass')).to.equal(false);
			expect(input.classList.contains('someAnotherClass')).to.equal(false);
		});

	});
});
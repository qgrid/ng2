import {Container} from './container';

describe('Container', () => {
	let elements = [];
	let container;

	beforeEach(function() {
		for (let i = 0; i < 5; i++) {
			let div = document.createElement('div');
			elements.push(div);
		}
		container = new Container(elements);
	});

	describe('addClass', () => {
		it('should check whether all elements contains class ', () => {
			container.addClass('someClass');
			expect(elements.every(div => div.classList.contains('someClass'))).to.equal(true);
		});
	});

	describe('hasClass', () => {
		it('should check whether at-least one element contains class', () => {
			container.addClass('someClass');
			expect(container.hasClass('someClass')).to.equal(true);
		});
	});

	describe('removeClass', () => {
		it('should remove class from every element', () => {
			container.addClass('someClass');
			container.removeClass('someClass');
			expect(elements.every(div => div.classList.contains('someClass'))).to.equal(false);
		});
	});

	describe('get classList', () => {
		it('testing classList methods', () => {
			let result = container.classList;
			result.add('someClass');
			expect(result.contains('someClass')).to.equal(true);
			result.remove('someClass');
			expect(result.contains('someClass')).to.equal(false);
		});

	});
});



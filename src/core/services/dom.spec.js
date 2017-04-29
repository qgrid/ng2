import {css} from './dom';

describe('dom utility', () => {

	describe('css', () => {
		let element;

		beforeEach(() => {
			element = document.createElement('DIV');
			element.style.visibility = 'visible';
			element.style.overflowY = 'visible';
		});

		it('should set property when passed three arguments', () => {
			const property = 'visibility';
			const value = 'hidden';

			css(element, property, value);

			expect(element.style[property]).to.equal(value);
		});

		it('should return property when passed two arguments', () => {
			const property = 'visibility';
			const expectedValue = 'visible';

			const value = css(element, property);

			expect(value).to.equal(expectedValue);
		});

		it('should set property passed in kebab case', () => {
			const property = 'overflow-y';
			const value = 'hidden';

			css(element, property, value);

			expect(element.style.overflowY).to.equal(value);
		});

		it('should return property passed in kebab case', () => {
			const property = 'overflow-y';
			const expectedValue = 'visible';

			const value = css(element, property);

			expect(value).to.equal(expectedValue);
		});
	});

});
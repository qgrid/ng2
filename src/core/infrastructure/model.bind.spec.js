import {ModelBinder} from './model.bind';
import {Event} from './event';

describe('ModelBinder', () => {
	let model = {
		test: function (value) {
			if (value) {
				return null;
			}
			else {
				return {
					newValue: 'testValue'
				}
			}
		},
		testChanged: new Event()
	};

	let names = ['test'];

	let source = {
		testNewValue: null
	};

	let modelBinder = new ModelBinder(source);
	modelBinder.bind(model, names);

	describe('bind', () => {

		it('should set new value to testNewValue property', () => {
			expect(source.testNewValue).to.equal('testValue');
		});

	});
});
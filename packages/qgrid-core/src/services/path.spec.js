import * as path from './path';

describe('path service', () => {
	describe('compile', () => {
		const compile = path.compile;

		it('should throw exception when no argument', () => {
			expect(compile).throw();
		});

		it('should return value by path', () => {
			const path = ['name', 'last'];
			const item = {
				name: {
					last: 'Doe',
					first: 'John'
				}
			};

			const value = compile(path);

			expect(value(item)).to.equal(item.name.last);
		});

		it('should set value by path', () => {
			const path = ['name', 'last'];
			const item = {
				name: {
					last: 'Doe',
					first: 'John'
				}
			};

			const value = compile(path);

			value(item, 'Johnson');
			expect(item.name.last).to.equal('Johnson');
		});
	});
});
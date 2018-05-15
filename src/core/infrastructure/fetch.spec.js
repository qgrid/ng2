import {Fetch} from './fetch';

describe('Fetch', () => {

	describe('run', () => {

		it('should set 123 value to fetch.result if Fetch takes a function as an argument', () => {

			const select = value => { return value};

			let fetch = new Fetch(select);
			fetch.run(123);

			expect(fetch.result).to.equal(123);
		});

		it('should set 123 value to fetch.result if Fetch takes a value as an argument', () => {

			let fetch = new Fetch(123);
			fetch.run('someData');

			expect(fetch.result).to.equal(123);
		});

		it('should set 123 value to fetch.result if Fetch takes a promise as an argument', (done) => {

			const select = (item) => {
				return new Promise((resolve) => {
					resolve(item);
				});
			};

			let fetch = new Fetch(select);
			fetch.run(123);

			fetch.busy.then(result => {
				expect(result).to.equal(123);
				done();
			});
		});
		
	});
});

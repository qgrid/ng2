import {Middleware} from './middleware';

describe('Middleware', () => {
	it('should return promise', () => {
		let pipeline = new Middleware([]);
		expect(pipeline.run()).to.be.a('promise');
	});

	it('should call first stage with initial data', (done) => {
		let pipeline = new Middleware([
			(data, ctx, next) => {
				expect(data).to.eql([1, 2, 3]);
				next(data);
			}
		]);

		pipeline.run({}, [1, 2, 3]).then(() => done());
	});

	it('should pass handled data to the next stage', (done) => {
		let middleware = new Middleware([
			(data, ctx, next) => {
				next(data.slice(1));
			},
			(data, ctx, next) => {
				expect(data).to.eqls([2, 3]);
				next(data.slice(1));
			}
		]);

		middleware.run({}, [1, 2, 3]).then((data) => {
			expect(data).to.eqls([3]);
			done();
		});
	});

	it('should be stopped if stage has exception', (done) => {
		let middleware = new Middleware([
			(data, ctx, next) => {
				throw new Error('');
			},
			(data, ctx, next) => {
				expect(true).to.be.equal(false);
				next(data.slice(1));
			}
		]);

		middleware
			.run({}, [1, 2, 3])
			.then((data) => {
			})
			.catch(() => done());
	});
});
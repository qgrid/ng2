import { Model } from '../../core/infrastructure/model';
import { GridService } from '../../core/services/grid';
import { RestView } from './rest.view';

describe('rest plugin', () => {
	let config;
	let model;
	let service;
	let get;
	let post;

	beforeEach(() => {
		model = new Model();
		service = new GridService(model);
		get = chai.spy(
			(url, params) => new Promise(resolve => resolve({ data: [] }))
		);
		post = chai.spy(
			(url, params) => new Promise(resolve => resolve({ data: [] }))
		);
		config = { get, post };
	});

	describe('configuration', () => {
		it('should throw if url is not provided', () => {
			expect(() => new RestView(model, config)).to.throw(
				'qgrid.rest: REST endpoint URL is required'
			);
		});

		it('should throw if method is incorrect', () => {
			model.rest({ url: 'foo', method: 'bar' });
			expect(() => new RestView(model, config)).to.throw(
				'qgrid.rest: "bar" is incorrect REST method'
			);
		});

		it('should use get by default', done => {
			model.rest({ url: 'url' });
			new RestView(model, config);
			service.invalidate().then(() => {
				expect(get).to.have.been.called.with('url', {
					order: '',
					filter: '',
					skip: 0,
					take: 50
				});
				done();
			});
		});

		it('should use get if configured', done => {
			model.rest({ url: 'url', method: 'get' });
			new RestView(model, config);
			service.invalidate().then(() => {
				expect(get).to.have.been.called();
				done();
			});
		});

		it('should use post if configured', done => {
			model.rest({ url: 'url', method: 'post' });
			new RestView(model, config);
			service.invalidate().then(() => {
				expect(post).to.have.been.called();
				done();
			});
		});

		it('should use custom serializer if provided', done => {
			model.rest({
				url: 'url',
				method: 'post',
				serialize: model => 'serialized'
			});

			new RestView(model, config);
			service.invalidate().then(() => {
				expect(post).to.have.been.called.with('url', 'serialized');
				done();
			});
		});

		it('should pass url and params to get', done => {
			model.rest({ url: 'url' });
			new RestView(model, config);
			service.invalidate().then(() => {
				expect(get).to.have.been.called.with('url', {
					order: '',
					filter: '',
					skip: 0,
					take: 50
				});
				done();
			});
		});

		// it('should pass url and params to post', done => {
		// 	model.rest({ url: 'url', method: 'post' });
		// 	new RestView(model, config);
		// 	service.invalidate()
		// 		.then(() => {
		// 			expect(post).to.have.been.called.with('url', { order: [], filter: {}, skip: 0, take: 50 });
		// 			done();
		// 		});
		// });
	});
});

import {Model} from '@grid/core/infrastructure';
import {GridService} from '@grid/core/services';
import {Rest} from './rest';

describe('rest plugin', () => {
	let config;
	let model;
	let service;
	let get;
	let post;

	beforeEach(() => {
		model = new Model();
		service = new GridService(model);
		config = null;
		get = chai.spy((url, params) => new Promise(resolve => resolve({data: []})));
		post = chai.spy((url, params) => new Promise(resolve => resolve({data: []})));
	});

	describe('configuration', () => {
		it('should throw if url is not provided', () => {
			expect(() => new Rest(model, config)).to.throw('qgrid.rest: REST endpoint URL is required');
		});

		it('should throw if method is incorrect', () => {
			config = {url: 'url', get, post, method: 'incorrect'};
			expect(() => new Rest(model, config)).to.throw('qgrid.rest: "incorrect" is incorrect REST method');
		});

		it('should use get by default', (done) => {
			config = {url: 'url', get, post};
			new Rest(model, config);
			service.invalidate()
				.then(() => {
					expect(get).to.have.been.called.with('url', {order: '', filter: '', skip: 0, take: 50});
					done();
				});
		});

		it('should use get if configured', done => {
			config = {url: 'url', get, post, method: 'get'};
			new Rest(model, config);
			service.invalidate()
				.then(() => {
					expect(get).to.have.been.called();
					done();
				});
		});

		it('should use post if configured', done => {
			config = {url: 'url', get, post, method: 'post'};
			new Rest(model, config);
			service.invalidate()
				.then(() => {
					expect(post).to.have.been.called();
					done();
				});
		});

		it('should use custom serializer if provided', done => {
			config = {url: 'url', get, post, method: 'post'};
			config.serialize = model => 'serialized';
			new Rest(model, config);
			service.invalidate()
				.then(() => {
					expect(post).to.have.been.called.with('url', 'serialized');
					done();
				});
		});

		it('should pass url and params to get', done => {
			config = {url: 'url', get, post};
			new Rest(model, config);
			service.invalidate()
				.then(() => {
					expect(get).to.have.been.called.with('url', {order: '', filter: '', skip: 0, take: 50});
					done();
				});
		});

		it('should pass url and params to post', done => {
			config = {url: 'url', method: 'post', get, post};
			new Rest(model, config);
			service.invalidate()
				.then(() => {
					expect(post).to.have.been.called.with('url', {order: [], filter: {}, skip: 0, take: 50});
					done();
				});
		});
	});
});

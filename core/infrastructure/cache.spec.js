import {Cache} from './cache';

describe('cache', () => {

	let cache;

	beforeEach(() => {
		cache = new Cache();
		cache.set('key', 'value');
	});

	describe('get', () => {
		it('should throw an exception if property does not exists', () => {
			expect(() => cache.get('fakeKey')).to.throw('Entry with key was not found');
		});

		it('should return value', () => {
			expect(cache.get('key')).to.equal('value');
		});
	});

	describe('has', () => {
		it('should return false if property does not exists', () => {
			expect(cache.has('fakeKey')).to.equal(false);
		});

		it('should return true if property exists', () => {
			expect(cache.has('key')).to.equal(true);
		});
	});

	describe('find', () => {
		it('should return null if property does not exists', () => {
			expect(cache.find('fakeKey')).to.equal(null);
		});

		it('should return value', () => {
			expect(cache.find('key')).to.equal('value');
		});
	});

	describe('remove', () => {
		it('should throw an exception if property does not exists', () => {
			expect(() => cache.remove('fakeKey')).to.throw('Entry with key was not found');
		});

		it('should return null if property was removed', () => {
			cache.remove('key');
			expect(cache.find('key')).to.equal(null);
		});
	});
});
import * as CastFactory from './cast.factory';

describe('CastFactory', () => {
	describe('castFactory', () => {
		it('should return 123', () => {
			const foo = CastFactory.castFactory(123);
			const result = foo(123);
			expect(result).to.equal(123);
		});

		it('should convert 123 to string', () => {
			const foo = CastFactory.castFactory(123);
			const result = foo('string');
			expect(result).to.equal('123');
		});

		it('should convert "123" to number', () => {
			const foo = CastFactory.castFactory('123');
			const result = foo(1);
			expect(result).to.equal(123);
		});

		it('should convert string to Date', () => {
			const foo = CastFactory.castFactory('2015-05-05');
			const result = foo(new Date(2017));
			expect(result).to.be.an.instanceof(Date);
		});

		it('should convert string to number', () => {
			const foo = CastFactory.castFactory('123');
			const result = foo(Number(123));
			expect(result).to.equal(123);
		});

		it('should convert "true" to true', () => {
			const foo = CastFactory.castFactory('true');
			const result = foo(Boolean(true));
			expect(result).to.equal(true);
		});

		it('should throw an exception if unsupported format', () => {
			const foo = CastFactory.castFactory(123);
			expect(() => foo(() => {})).to.throw();
		});
	});
});

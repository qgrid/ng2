import * as CastFactory from './cast.factory';

describe('CastFactory', () => {
	describe('castFactory', () => {
		it('should return 123', () => {
			let foo = CastFactory.castFactory(123);
			let result = foo(123);
			expect(result).to.equal(123);
		});

		it('should convert 123 to string', () => {
			let foo = CastFactory.castFactory(123);
			let result = foo('string');
			expect(result).to.equal('123');
		});

		it('should convert "123" to number', () => {
			let foo = CastFactory.castFactory('123');
			let result = foo(1);
			expect(result).to.equal(123);
		});

		it('should convert string to Date', () => {
			let foo = CastFactory.castFactory('2015-05-05');
			let result = foo(new Date(2017));
			expect(result).to.be.an.instanceof(Date);
		});

		it('should convert string to number', () => {
			let foo = CastFactory.castFactory('123');
			let result = foo(Number(123));
			expect(result).to.equal(123);
		});

		it('should convert "true" to true', () => {
			let foo = CastFactory.castFactory('true');
			let result = foo(Boolean(true));
			expect(result).to.equal(true);
		});

		it('should throw an exception if unsupported format', () => {
			let foo = CastFactory.castFactory(123);
			expect(() => foo(() => {})).to.throw();
		});
	});
});

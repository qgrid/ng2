import {Aggregation} from './aggregation';

describe('Aggregation', () => {
	const getValue = value => value;
	const testArray = [2, 1, 2, 3, 3, 5, 4]; // sum - 20, uniqsum - 15
	const optionsWithoutDistinctProperty = {separator: '|'};
	const optionsWithDistinctProperty = {distinct: true, separator: '|'};
	const ContainerOfSet = new Set();

	describe('first', () => {
		it('should return null, if rows are empty', () => {
			expect(Aggregation.first([], getValue)).to.be.equal(null);
		});
		it('should return first row, if rows are not empty ', () => {
			expect(Aggregation.first(testArray, getValue)).to.be.equal(2);
		});		
	});

	describe('last', () => {
		it('should return null, if rows are empty', () => {
			expect(Aggregation.last([], getValue)).to.be.equal(null);
		});
		it('should return last row, if rows are not empty', () => {
			expect(Aggregation.last(testArray, getValue)).to.be.equal(4);
		});
	});

	describe('max', () => {
		it('should return null, if rows are empty', () => {
			expect(Aggregation.max([], getValue)).to.be.equal(null);
		});
		it('should return max row, if rows are not empty', () => {
			expect(Aggregation.max(testArray, getValue)).to.be.equal(5);
		});
	});

	describe('min', () => {
		it('should return null, if rows are empty', () => {
			expect(Aggregation.min([], getValue)).to.be.equal(null);
		});
		it('should return min row, if rows are not empty', () => {
			expect(Aggregation.min(testArray, getValue)).to.be.equal(1);
		});
	});

	describe('minMax', () => {
		it('should return null, if rows are empty', () => {
			expect(Aggregation.minMax([], getValue)).to.be.equal(null);
		});
		it('should return min and max row, if rows are not empty', () => {
			expect(JSON.stringify(Aggregation.minMax(testArray, getValue))).to.be.equal(JSON.stringify([1, 5]));
		});
	});

	describe('sum', () => {
		it('should return null, if rows are empty', () => {
			expect(Aggregation.sum([], getValue)).to.be.equal(null);
		});
		it('should return sum of uniq rows, if options has distinct prop', () => {
			expect(Aggregation.sum(testArray, getValue, optionsWithDistinctProperty, ContainerOfSet)).to.be.equal(15);
		});
		it('should return sum of rows, if options has not distinct prop', () => {
			expect(Aggregation.sum(testArray, getValue, optionsWithoutDistinctProperty, ContainerOfSet)).to.be.equal(20);
		});
	});

	describe('avg', () => {
		it('should return null, if rows are empty', () => {
			expect(Aggregation.avg([], getValue)).to.be.equal(null);
		});
		it('should return average number of uniq rows, if options has distinct prop', () => {
			expect(Aggregation.avg(testArray, getValue, optionsWithDistinctProperty)).to.be.equal(3);
		});
		it('should return average number of rows, if options has not distinct prop', () => {
			expect(Number(Aggregation.avg(testArray, getValue, optionsWithoutDistinctProperty).toFixed(3))).to.be.equal(2.857);
		});
	});

	describe('join', () => {
		it('should return null, if rows are empty', () => {
			expect(Aggregation.join([], getValue)).to.be.equal(null);
		});
		it('should return concat of uniq rows, if options has distinct prop', () => {
			expect(Aggregation.join(testArray, getValue, optionsWithDistinctProperty)).to.be.equal('2|1|3|5|4');
		});
		it('should return concat of rows, if options has not distinct prop', () => {
			expect(Aggregation.join(testArray, getValue, optionsWithoutDistinctProperty)).to.be.equal('2|1|2|3|3|5|4');
		});
	});

	describe('count', () => {
		it('should return null, if rows are empty', () => {
			expect(Aggregation.count([], getValue)).to.be.equal(null);
		});
		it('should return count of uniq rows, if options has distinct prop', () => {
			expect(Aggregation.count(testArray, getValue, optionsWithDistinctProperty)).to.be.equal(5);
		});
		it('should return count of rows, if options has not distinct prop', () => {
			expect(Aggregation.count(testArray, getValue, optionsWithoutDistinctProperty)).to.be.equal(7);
		});
	});
});
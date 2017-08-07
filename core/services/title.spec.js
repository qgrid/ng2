import * as Title from './title';

describe('Title', () => {

	describe('alphaTitle', () => {
		it('should return alphabet letter if index < 26', () => {
			expect(Title.alphaTitle(0)).to.be.equal('A');
		});
		it('should return 2 alphabet letters if index >= 26', () => {
			expect(Title.alphaTitle(30)).to.be.equal('AE');
		});
	});
});

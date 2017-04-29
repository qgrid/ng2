import * as fileService from './file';

describe('file service', () => {
	it('should be truthy if file is jpg', () => {
		expect(fileService.isImage('picture.jpg')).to.be.true;
		expect(fileService.isImage('picture.jpeg')).to.be.true;
	});

	it('should be truthy if file is png', () => {
		expect(fileService.isImage('picture.png')).to.be.true;
	});

	it('should be truthy if file is svg', () => {
		expect(fileService.isImage('picture.svg')).to.be.true;
	});

	it('should be falsy if file isn\'t image', () => {
		expect(fileService.isImage('notPicture.txt')).to.be.false;
	});
});
import { isFileAnImage } from './file';

describe('file service', () => {
  it('should be truthy if file is jpg', () => {
    expect(isFileAnImage('picture.jpg')).to.be.true();
    expect(isFileAnImage('picture.jpeg')).to.be.true();
  });

  it('should be truthy if file is png', () => {
    expect(isFileAnImage('picture.png')).to.be.true();
  });

  it('should be truthy if file is svg', () => {
    expect(isFileAnImage('picture.svg')).to.be.true();
  });

  it('should be falsy if file isn\'t image', () => {
    expect(isFileAnImage('notPicture.txt')).to.be.false();
  });
});

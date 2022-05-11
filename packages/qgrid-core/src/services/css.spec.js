import * as Css from './css';

describe('Css', () => {
  const testStyleObject = {someStyle: {color: 'yellow'}, someStyle2: {visibility: 'hidden'}};
  const testObject = Css.sheet('q', 'style');

  describe('sheet', () => {

    it('should check whether Style tag was append to Head tag', () => {
      testObject.set(testStyleObject);

      const isStyleTagExist = document.querySelector('head > style#q-style') !== null;

      expect(isStyleTagExist).to.be.equal(true);
    });
    it('should check whether Style tag was removed from Head tag', () => {
      testObject.remove();

      const isStyleTagExist = document.querySelector('head > style#q-style') !== null;

      expect(isStyleTagExist).to.be.equal(false);
    });
  });
});

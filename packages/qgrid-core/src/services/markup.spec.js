import * as Markup from './markup';

describe('markup.service', () => {
  const testObject = {someStyle: {color: 'yellow'}, someStyle2: {visibility: 'hidden'}};

  it('should make array which contains strings of styles from testObject', () => {
    const arr = Markup.buildLines(testObject);

    expect(arr[0]).to.equal('someStyle{\n\tcolor:yellow !important;\n}');
    expect(arr[1]).to.equal('someStyle2{\n\tvisibility:hidden !important;\n}');
  });
});

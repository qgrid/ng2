import * as Merge from './merge';

describe('merge.service', () => {

  const settings = {};
  const foo = Merge.merge(settings);

  it('should return number of items of property updated and set values to result array', () => {
    const left = [
      1,
      2,
      3,
    ];
    const right = [
      1,
      2,
      3,
      40,
      50,
      60,
      70,
      80,
    ];
    const result = [];
    const resultObject = foo(left, right, result);

    expect(resultObject.updated).to.equal(3);
    expect(JSON.stringify(result)).to.equal('[40,50,60,70,80]');
  });

  it('should return number of items of property inserted and set values to result array', () => {
    const left = [1];
    const right = [
      1,
      2,
      3,
      4,
      5,
      6,
    ];
    const result = [];
    const resultObject = foo(left, right, result);

    expect(resultObject.inserted).to.equal(5);
    expect(JSON.stringify(result)).to.equal('[2,3,4,5,6]');
  });

  it('should return number of items of property removed', () => {
    const left = [
      1,
      2,
      3,
      4,
      5,
      6,
    ];
    const right = [1];
    const result = [];
    const resultObject = foo(left, right, result);

    expect(resultObject.removed).to.equal(5);
    expect(JSON.stringify(result)).to.equal('[]');
  });
});

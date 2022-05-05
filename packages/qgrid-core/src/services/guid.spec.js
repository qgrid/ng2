import * as Guid from './guid';

describe('guid.service', () => {
  const guid = Guid.guid();
  const exp = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/;
  const isMatch = exp.test(guid);

  it('should return true if Guid matches the given regular expression', () => {
    expect(isMatch).to.be.equal(true);
  });
});

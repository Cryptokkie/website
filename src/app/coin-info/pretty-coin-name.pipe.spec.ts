import { PrettyCoinNamePipe } from './pretty-coin-name.pipe';

describe('PrettyCoinNamePipe', () => {
  it('create an instance', () => {
    const pipe = new PrettyCoinNamePipe();
    expect(pipe).toBeTruthy();
  });
});

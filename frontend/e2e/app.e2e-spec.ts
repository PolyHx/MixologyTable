import { MixologyPage } from './app.po';

describe('mixology App', () => {
  let page: MixologyPage;

  beforeEach(() => {
    page = new MixologyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class BrowseOpportunityPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.BROWSE_OPPORTUNITIES}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const browseOpportunityPage = new BrowseOpportunityPage();

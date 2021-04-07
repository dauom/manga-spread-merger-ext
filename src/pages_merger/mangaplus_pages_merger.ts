import {Page, PagesFinder} from '../pages_finder/pages_finder';
import {PagesMerger} from './pages_merger';

export class MangaplusPagesMerger implements PagesMerger {
  constructor(private readonly pagesFinder: PagesFinder) {}

  mergeWithNext(page: Page) {
    const pageIndex: number = this.pagesFinder.indexOf(page);
    if (pageIndex === -1) {
      throw new Error('Invalid argument: page not foundin the document.');
    }
    const nextPage: Page = this.pagesFinder.item(pageIndex + 1);
    page.parentElement?.prepend(nextPage);
  }

  unmerge(page: Page) {
    throw new Error('Not implemented yet');
  }

  isMerged(page: Page): boolean {
    const container: HTMLElement | null = page.parentElement;
    if (!container) {
      throw new Error("Invalid state: page doesn't have a parent container.");
    }
    return container.children.length > 1;
  }
}

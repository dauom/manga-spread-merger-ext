import {HTMLElementOrNone} from '../constants';
import {Page, PagesFinder} from '../pages_finder/pages_finder';
import {nearestAncestor} from '../utils/dom_traversal';
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
    const parent: HTMLElement | null = page.parentElement;
    if (!parent) {
      throw new Error("Invalid state: page doesn't have a parent container.");
    }
    const nextPage: Page = parent.children[0] as HTMLElement;
    const pageIndex: number = this.pagesFinder.indexOf(page);
    if (pageIndex === -1) {
      throw new Error('Invalid argument: page not foundin the document.');
    }

    const container: HTMLElementOrNone = nearestAncestor(page, 'zao-container');
    if (!container) {
      throw new Error("Invalid state: couldn't find parent container.");
    }
    const surfaceContainer: HTMLElementOrNone = container.parentElement;
    if (!surfaceContainer) {
      throw new Error("Invalid state: couldn't find parent pages container.");
    }
    if (!surfaceContainer.classList.contains('zao-surface')) {
      throw new Error("Invalid state: couldn't find `.zao-surface` container.");
    }
    const nextPageParent: HTMLElementOrNone = container.nextElementSibling?.querySelector(
      '.zao-image-container'
    );
    if (!nextPageParent) {
      throw new Error(
        "Invalid state: next page doesn't have a parent container."
      );
    }
    nextPageParent.append(nextPage);
  }

  isMerged(page: Page): boolean {
    const container: HTMLElement | null = page.parentElement;
    if (!container) {
      throw new Error("Invalid state: page doesn't have a parent container.");
    }
    return container.children.length > 1;
  }
}

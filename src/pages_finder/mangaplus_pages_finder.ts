import {nearestAncestor} from '../utils/dom_traversal';
import {PagesFinder, Page} from './pages_finder';

export class MangaplusPagesFinder implements PagesFinder {
  constructor(readonly root: HTMLElement) {}

  find(): Page[] {
    const pages: Page[] = [];
    const nodes: NodeListOf<HTMLElement> = this.root.querySelectorAll(
      '.zao-page .zao-image'
    );
    nodes.forEach((node: HTMLElement) => {
      pages.push(node);
    });
    return pages;
  }

  indexOf(page: Page): number {
    const container: HTMLElement | null = nearestAncestor(
      page,
      'zao-container'
    );
    if (!container) {
      throw new Error("Invalid state: couldn't find parent container.");
    }

    const surfaceContainer: HTMLElement | null = container.parentElement;
    if (!surfaceContainer) {
      throw new Error("Invalid state: couldn't find parent pages container.");
    }
    if (!surfaceContainer.classList.contains('zao-surface')) {
      throw new Error("Invalid state: couldn't find `.zao-surface` container.");
    }

    const allContainers = surfaceContainer.childNodes;
    for (let i = 0; i < allContainers.length; i++) {
      if (container.isSameNode(allContainers[i])) {
        return i;
      }
    }

    return -1;
  }

  item(index: number): Page {
    return this.find()[index];
  }

  matchesUrl(url: string): boolean {
    return url.includes('mangaplus.shueisha.co.jp/');
  }
}

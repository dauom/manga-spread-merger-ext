import {nearestAncestor} from '../utils/dom';
import {PagesFinder, Page, PagesTagger, PagesMetadata} from './pages_finder';

export class MangaplusPagesFinder implements PagesFinder {
  readonly tagger: PagesTagger;
  readonly metadata: PagesMetadata;

  constructor(readonly root: HTMLElement) {
    this.tagger = new MangaplusPagesTagger(this.root);
    this.metadata = new MangaplusPagesMetadata();
  }

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

class MangaplusPagesTagger implements PagesTagger {
  constructor(readonly root: HTMLElement) {}

  tag(page: Page) {
    page.dataset.msmExtTag = 'true';
  }

  findUntagged(): Page[] {
    const pages: Page[] = [];
    const nodes: NodeListOf<HTMLElement> = this.root.querySelectorAll(
      '.zao-page .zao-image:not([data-msm-ext-tag])'
    );
    nodes.forEach((node: HTMLElement) => {
      pages.push(node);
    });
    return pages;
  }
}

class MangaplusPagesMetadata implements PagesMetadata {
  readonly pagesContainerClassName: string = 'zao-surface';
}

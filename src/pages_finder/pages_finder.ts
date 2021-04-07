export type Page = HTMLElement;

export interface PagesFinder {
  readonly root: HTMLElement;
  readonly tagger: PagesTagger;

  find(): Page[];
  indexOf(page: Page): number;
  item(index: number): Page;
  matchesUrl(url: string): boolean;
}

export interface PagesTagger {
  readonly root: HTMLElement;

  tag(page: Page): void;
  findUntagged(): Page[];
}

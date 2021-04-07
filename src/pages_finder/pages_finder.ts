export type Page = HTMLElement;

export interface PagesFinder {
  readonly root: HTMLElement;
  find(): Page[];
  indexOf(page: Page): number;
  item(index: number): Page;
  matchesUrl(url: string): boolean;
}

import {Page} from '../pages_finder/pages_finder';

export interface PagesMerger {
  mergeWithNext(pages: Page): void;
  unmerge(page: Page): void;
  isMerged(page: Page): boolean;
}

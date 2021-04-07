import {MangaplusPagesFinder} from '../pages_finder/mangaplus_pages_finder';
import {PagesFinder} from '../pages_finder/pages_finder';
import {MangaplusPagesMerger} from '../pages_merger/mangaplus_pages_merger';
import {PagesMerger} from '../pages_merger/pages_merger';

export interface MangaSiteHandler {
  readonly pagesFinder: PagesFinder;
  readonly pagesMerger: PagesMerger;
}

const mangaSitesHandlers = [setupMangaPlus()];

export function mangaSiteHandler(url: string): MangaSiteHandler {
  for (const handler of mangaSitesHandlers) {
    if (handler.pagesFinder.matchesUrl(url)) {
      return handler;
    }
  }
  throw new Error('Unsupported manga site');
}

function setupMangaPlus(): MangaSiteHandler {
  const pagesFinder: PagesFinder = new MangaplusPagesFinder(document.body);
  const pagesMerger: PagesMerger = new MangaplusPagesMerger(pagesFinder);
  return {pagesFinder, pagesMerger};
}

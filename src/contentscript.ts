import {Page, PagesFinder} from './pages_finder/pages_finder';
import {MangaplusPagesFinder} from './pages_finder/mangaplus_pages_finder';
import {browser} from 'webextension-polyfill-ts';
import {togglePageHover} from './utils/pages_selector';
import {PagesMerger} from './pages_merger/pages_merger';
import {MangaplusPagesMerger} from './pages_merger/mangaplus_pages_merger';

console.log('MSM Extension loaded');

browser.runtime.onMessage.addListener(() => {
  const pageFinder: PagesFinder = new MangaplusPagesFinder(document.body);
  const pageMerger: PagesMerger = new MangaplusPagesMerger(pageFinder);

  const url: string = window.location.href;
  if (!pageFinder.matchesUrl(url)) {
    return;
  }

  const pages: Page[] = pageFinder.find();
  for (const page of pages) {
    page.addEventListener('mouseover', () => {
      togglePageHover(page);
    });
    page.addEventListener('mouseout', () => {
      togglePageHover(page);
    });
    page.addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();

      if (pageMerger.isMerged(page)) {
        pageMerger.unmerge(page);
        return;
      }
      pageMerger.mergeWithNext(page);
    });
  }
});

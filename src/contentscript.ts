import {Page, PagesFinder} from './pages_finder/pages_finder';
import {MangaplusPagesFinder} from './pages_finder/mangaplus_pages_finder';
import {PagesMerger} from './pages_merger/pages_merger';
import {MangaplusPagesMerger} from './pages_merger/mangaplus_pages_merger';
import {waitFor} from './utils/dom';

console.log('MSM Extension loaded');

const pagesFinder: PagesFinder = new MangaplusPagesFinder(document.body);
const pagesMerger: PagesMerger = new MangaplusPagesMerger(pagesFinder);

function tagAndListen(
  pages: Page[],
  pagesFinder: PagesFinder,
  pagesMerger: PagesMerger
) {
  for (const page of pages) {
    page.addEventListener('click', (e: MouseEvent) => {
      if (!(e.ctrlKey && e.shiftKey)) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();

      if (pagesMerger.isMerged(page)) {
        pagesMerger.unmerge(page);
      } else {
        pagesMerger.mergeWithNext(page);
      }
    });
    pagesFinder.tagger.tag(page);
  }
}

waitFor(document.body, 'zao-surface', (e: HTMLElement) => {
  function findAndTagPages() {
    const untaggedPages: Page[] = pagesFinder.tagger.findUntagged();
    if (untaggedPages.length) {
      tagAndListen(untaggedPages, pagesFinder, pagesMerger);
    }
  }
  findAndTagPages();

  const observer = new MutationObserver(findAndTagPages);
  const observerConfig: MutationObserverInit = {
    subtree: true,
    childList: true,
    attributes: false,
  };
  observer.observe(e, observerConfig);
});

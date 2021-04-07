import {Page} from './pages_finder/pages_finder';
import {waitFor} from './utils/dom';
import {
  MangaSiteHandler,
  mangaSiteHandler,
} from './manga_sites_registry/manga_sites_registry';

const handler: MangaSiteHandler = mangaSiteHandler(window.location.href);

function tagAndListen(pages: Page[], handler: MangaSiteHandler) {
  for (const page of pages) {
    page.addEventListener('click', (e: MouseEvent) => {
      if (!(e.ctrlKey && e.shiftKey)) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();

      if (handler.pagesMerger.isMerged(page)) {
        handler.pagesMerger.unmerge(page);
      } else {
        handler.pagesMerger.mergeWithNext(page);
      }
    });
    handler.pagesFinder.tagger.tag(page);
  }
}

waitFor(
  document.body,
  handler.pagesFinder.metadata.pagesContainerClassName,
  (e: HTMLElement) => {
    function findAndTagPages() {
      const untaggedPages: Page[] = handler.pagesFinder.tagger.findUntagged();
      if (untaggedPages.length) {
        tagAndListen(untaggedPages, handler);
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
  }
);

console.log('MSM Extension loaded');

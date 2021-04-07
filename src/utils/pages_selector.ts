import {DEFAULT_PAGE_CLASSNAME_MOUSEOVER} from '../constants';
import {Page} from '../pages_finder/pages_finder';

export function togglePageHover(page: Page): boolean {
  return page.classList.toggle(DEFAULT_PAGE_CLASSNAME_MOUSEOVER);
}

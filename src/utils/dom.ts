import {ElementOrNone} from '../constants';

export function nearestAncestor(
  node: HTMLElement,
  className: string
): HTMLElement | null {
  while (node) {
    if (node.classList.contains(className)) {
      return node;
    }
    node = node.parentElement as HTMLElement;
  }
  return null;
}

interface WaitForCallback {
  (e: HTMLElement): void;
}
const waitMap = new Map<string, number>();
const TIMEOUT_DURATION = 500;
const TIMEOUT_LIMIT = 50000;

export function waitFor(
  root: HTMLElement,
  className: string,
  callback: WaitForCallback
) {
  setTimeout(() => {
    const e: ElementOrNone = root.querySelector(`.${className}`);
    if (e) {
      callback(e as HTMLElement);
      return;
    }

    const timeWaited = (waitMap.get(className) || 0) + TIMEOUT_DURATION;
    waitMap.delete(className);
    if (timeWaited > TIMEOUT_LIMIT) {
      return;
    }
    waitMap.set(className, timeWaited);

    waitFor(root, className, callback);
  }, TIMEOUT_DURATION);
}

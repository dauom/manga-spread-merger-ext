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

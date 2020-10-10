import { RefTrackerValue } from '../hooks';
import { styles } from '../utils';

interface Menu<T = RefTrackerValue> {
  items: T[];
  isRoot: boolean;
  focusedIndex: number;
  parentNode: HTMLElement;
}

export function createMenuHandler() {
  const menuList = new Map<HTMLElement, Menu>();
  let focusedIndex = -1;
  let parentNode: HTMLElement;
  let isAtRoot = true;
  let currentItems: RefTrackerValue[];

  function init(rootMenu: RefTrackerValue[]) {
    currentItems = rootMenu;
  }

  function focusSelectedItem() {
    currentItems[focusedIndex].node.focus();
  }

  function isSubmenuFocused() {
    return focusedIndex >= 0 && currentItems[focusedIndex].isSubmenu;
  }

  function getSubmenuItems() {
    return Array.from(currentItems[focusedIndex].submenuRefTracker!.values());
  }

  function moveDown() {
    if (focusedIndex + 1 < currentItems.length) {
      focusedIndex++;
    } else if (focusedIndex + 1 === currentItems.length) {
      focusedIndex = 0;
    }
    focusSelectedItem();
  }

  function moveUp() {
    if (focusedIndex === -1 || focusedIndex === 0) {
      focusedIndex = currentItems.length - 1;
    } else if (focusedIndex - 1 < currentItems.length) {
      focusedIndex--;
    }
    focusSelectedItem();
  }

  function openSubmenu() {
    if (isSubmenuFocused()) {
      const submenuItems = getSubmenuItems();
      const currentNode = currentItems[focusedIndex].node;

      menuList.set(currentNode, {
        isRoot: isAtRoot,
        focusedIndex,
        parentNode: parentNode || currentNode,
        items: currentItems,
      });

      currentNode.classList.add(styles.submenuOpen);
      parentNode = currentNode;
      focusedIndex = 0;
      currentItems = submenuItems;
      isAtRoot = false;

      focusSelectedItem();
    }
  }

  function closeSubmenu() {
    if (!isAtRoot) {
      const {
        isRoot,
        items,
        focusedIndex: parentFocusedIndex,
        parentNode: menuParentNode,
      } = menuList.get(parentNode)!;

      parentNode.classList.remove(styles.submenuOpen);

      currentItems = items;
      focusedIndex = parentFocusedIndex;
      parentNode = menuParentNode;

      if (isRoot) {
        isAtRoot = true;
        menuList.clear();
      }

      focusSelectedItem();
    }
  }

  return {
    init,
    moveDown,
    moveUp,
    openSubmenu,
    closeSubmenu,
  };
}

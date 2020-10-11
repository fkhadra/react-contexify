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
  let focusedIndex: number;
  let parentNode: HTMLElement;
  let isAtRoot: boolean;
  let currentItems: RefTrackerValue[];
  let forceCloseSubmenu = false;

  function init(rootMenu: RefTrackerValue[]) {
    currentItems = rootMenu;
    focusedIndex = -1;
    isAtRoot = true;
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

  function isFocused() {
    if (focusedIndex === -1) {
      // focus first item
      moveDown();
      return false;
    }

    return true;
  }

  function moveDown() {
    if (focusedIndex + 1 < currentItems.length) {
      focusedIndex++;
    } else if (focusedIndex + 1 === currentItems.length) {
      focusedIndex = 0;
    }

    if (forceCloseSubmenu) closeSubmenu();

    focusSelectedItem();
  }

  function moveUp() {
    if (focusedIndex === -1 || focusedIndex === 0) {
      focusedIndex = currentItems.length - 1;
    } else if (focusedIndex - 1 < currentItems.length) {
      focusedIndex--;
    }

    if (forceCloseSubmenu) closeSubmenu();

    focusSelectedItem();
  }

  function openSubmenu() {
    if (isFocused() && isSubmenuFocused()) {
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

      if (submenuItems.length > 0) {
        focusedIndex = 0;
        currentItems = submenuItems;
      } else {
        forceCloseSubmenu = true;
      }

      isAtRoot = false;

      focusSelectedItem();
      return true;
    }
    return false;
  }

  function closeSubmenu() {
    if (isFocused() && !isAtRoot) {
      const {
        isRoot,
        items,
        focusedIndex: parentFocusedIndex,
        parentNode: menuParentNode,
      } = menuList.get(parentNode)!;

      parentNode.classList.remove(styles.submenuOpen);

      currentItems = items;
      parentNode = menuParentNode;

      if (isRoot) {
        isAtRoot = true;
        menuList.clear();
      }
      if (!forceCloseSubmenu) {
        focusedIndex = parentFocusedIndex;
        focusSelectedItem();
      }
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

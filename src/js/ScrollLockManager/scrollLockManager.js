export class ScrollLockManager {
  static #isLocked = false;
  static instance;

  constructor() {
    if (!ScrollLockManager.instance) {
      ScrollLockManager.instance = this;
    }
    return ScrollLockManager.instance;
  }

  static lock() {
    if (this.#isLocked) {
      return;
    }
    ScrollLockManager.#isLocked = true;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.dataset.scrollLock = scrollY;
  }

  static unlock() {
    if (!this.#isLocked) {
      return;
    }
    ScrollLockManager.#isLocked = false;
    const scrollY = parseInt(document.body.dataset.scrollLock || "0", 10);
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.dataset.scrollLock = "";
    window.scrollTo(0, scrollY);
  }

  get isLocked() {
    return ScrollLockManager.#isLocked;
  }
}

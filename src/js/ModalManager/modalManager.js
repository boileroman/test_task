import { ScrollLockManager } from "../ScrollLockManager/scrollLockManager";

export class ModalManager {
  static instance = null;
  static stateClasses = {
    overlay: "modal__overlay",
    overlayOpen: "modal__overlay_open",
    overlayClose: "modal__overlay_close",
  };

  static selectors = {
    modalOverlay: ".modal__overlay",
    closeBtn: "[data-js-close-btn]",
  };

  constructor(options = {}) {
    if (ModalManager.instance) {
      return ModalManager.instance;
    }

    this.defaultOptions = {
      animationClass: "fade",
      ...options,
    };

    this.createOverlay();
    ModalManager.instance = this;
  }

  createOverlay() {
    if (!document.querySelector(ModalManager.selectors.modalOverlay)) {
      const overlay = document.createElement("div");
      overlay.className = ModalManager.stateClasses.overlay;
      document.body.appendChild(overlay);
    }
  }

  attachCloseHandler(closeBtn, onClose) {
    const closeHandler = () => {
      onClose();
      this.closeAll();
    };
    closeBtn.addEventListener("click", closeHandler);
  }

  attachOverlayClickHandler(overlay, onClose) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        onClose();
        this.closeAll();
      }
    });
  }

  openModal({
    message,
    needCloseBtn,
    inCloseBtn = "Close",
    extraClasses = "",
    onClose = () => {},
    options = {},
  } = {}) {
    const overlay = document.querySelector(ModalManager.selectors.modalOverlay);
    const finalOptions = {
      ...this.defaultOptions,
      ...options,
    };

    overlay.innerHTML = `
      <div class="modal ${extraClasses} ${finalOptions.animationClass}">
        ${
          needCloseBtn
            ? `<button data-js-close-btn class="closeBtn">${inCloseBtn}</button>`
            : ""
        }
        ${message}
      </div>
    `;

    overlay.classList.add(ModalManager.stateClasses.overlayOpen);
    overlay.classList.remove(ModalManager.stateClasses.overlayClose);
    ScrollLockManager.lock();

    const closeBtn = overlay.querySelector(ModalManager.selectors.closeBtn);
    if (closeBtn) {
      this.attachCloseHandler(closeBtn, onClose);
    }

    this.attachOverlayClickHandler(overlay, onClose);
  }

  closeAll() {
    const overlay = document.querySelector(ModalManager.selectors.modalOverlay);
    if (overlay) {
      overlay.classList.remove(ModalManager.stateClasses.overlayOpen);
      overlay.classList.add(ModalManager.stateClasses.overlayClose);
      overlay.innerHTML = "";
      ScrollLockManager.unlock();
    }
  }

  static getInstance(options = {}) {
    if (!ModalManager.instance) {
      ModalManager.instance = new ModalManager(options);
    }
    return ModalManager.instance;
  }
}

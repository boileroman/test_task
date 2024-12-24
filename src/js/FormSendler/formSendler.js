import { ModalManager } from "../ModalManager/modalManager";

/**
 * Класс для отправки данных с формы
 */
export class FormSendler {
  static instance;

  attrs = {
    form: "data-js-form",
  };

  constructor() {
    if (FormSendler.instance) return FormSendler.instance;
    this.#bindEvents();
    FormSendler.instance = this;
  }

  static getInstance() {
    if (!FormSendler.instance) {
      FormSendler.instance = new FormSendler();
    }
    return FormSendler.instance;
  }

  #handleSubmit(e) {
    const { target, submitter } = e;
    if (!target.hasAttribute(`${this.attrs.form}`)) return;
    if (!target.tagName.toLowerCase() === "form") return;
    if (target.hasAttribute("unsolicited")) {
      submitter.disabled = false;
      return;
    }

    const cfg = JSON.parse(target.getAttribute(this.attrs.form));
    const {
      url,
      method = "POST",
      showModalAfterSuccess,
      preventDefault = true,
      redirectUrlAfterSuccess,
      delayBeforeRedirect,
    } = cfg;
    const data = new FormData(target);

    if (preventDefault) {
      e.preventDefault();
    }

    submitter.disabled = true;
    fetch(url, {
      method,
      body: data,
    })
      .then((res) => {
        if (showModalAfterSuccess) {
          ModalManager.getInstance().closeAll();
          ModalManager.getInstance().openModal({
            message: `<p>Данные успешно отправлены</p>`,
            needCloseBtn: true,
            extraClasses: "modalAfterSuccess__content",
            inCloseBtn: `<img src="../../../../public/assets/modal/closeBtn.svg" alt="" />`,
          });
        }
        if (redirectUrlAfterSuccess) {
          if (delayBeforeRedirect) {
            setTimeout(() => {
              location.href = redirectUrlAfterSuccess;
            }, delayBeforeRedirect);
          } else {
            location.href = redirectUrlAfterSuccess;
          }
        }
      })
      .finally(() => {
        submitter.disabled = false;
      });
  }

  #bindEvents() {
    document.addEventListener("submit", this.#handleSubmit.bind(this), false);
  }
}

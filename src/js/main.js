import { FormSendler } from "./FormSendler/formSendler.js";
import { ModalManager } from "./ModalManager/modalManager.js";
import { FormValidatorService } from "./services/FormValidatorService.js";
import "./styles.js";
import { isDomReady } from "./utils/isDomReady.js";

isDomReady().then(() => {
  console.debug("DOM ready");
  document.getElementById("openModalBtn").addEventListener("click", () => {
    const modalManager = ModalManager.getInstance();

    const formHTML = `
      <div class="modal__form">
        <h2>SEND US MESSAGE</h2>
        <form novalidate data-js-form='{"url": "/submit", "method": "POST", "showModalAfterSuccess": "Thank you!", "preventDefault": true}' id="contactForm">
          <label for="fullName">Full Name</label>
          <input type="text" id="fullName" name="fullName" placeholder="Your full name">
          
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Your email">
          
          <label for="message">Message</label>
          <textarea id="message" name="message" placeholder="Your message" rows="4"></textarea>
          
          <button class = "btn" type="submit">Submit</button>
        </form>
      </div>
    `;

    modalManager.openModal({
      message: formHTML,
      needCloseBtn: true,
      extraClasses: "modal__content",
      inCloseBtn: `<img src="../../../../public/assets/modal/closeBtn.svg" alt="" />`,
    });
    const form = document.getElementById("contactForm");
    const validator = FormValidatorService.setup(form);
    new FormSendler();
  });
});

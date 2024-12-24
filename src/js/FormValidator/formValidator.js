class FormValidator {
  constructor(form, config) {
    this.form = form;
    this.config = config;
    this.errors = {};
    this.submitButton = form.querySelector('[type="submit"]');
    this.init();
    this.bindSubmitListener();
  }

  init() {
    this.form.addEventListener("input", this.handleInput.bind(this));
  }

  bindSubmitListener() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this), true);
  }

  handleInput(event) {
    const field = event.target;
    if (this.config[field.name]) {
      this.validateField(field);
    }
  }

  handleSubmit(event) {
    this.validateForm();
    if (!this.isValidForm()) {
      event.preventDefault();
      this.form.setAttribute("unsolicited", "true");
    } else {
      this.form.removeAttribute("unsolicited");
    }
  }

  validateField(field) {
    const fieldConfig = this.config[field.name];
    const value = field.value.trim();
    const errors = [];

    const getSuffix = (number) => {
      const lastDigit = number % 10;
      const lastTwoDigits = number % 100;

      if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return "ов";
      }
      if (lastDigit === 1) {
        return "";
      }
      if (lastDigit >= 2 && lastDigit <= 4) {
        return "а";
      }
      return "ов";
    };

    if (!fieldConfig.required && !value) {
      this.errors[field.name] = [];
      this.displayErrors(field, []);
      return;
    }

    if (fieldConfig.required && !value) {
      errors.push("Это поле обязательно.");
    }

    if (fieldConfig.minLength && value.length < fieldConfig.minLength) {
      errors.push(
        `Минимальная длина ${fieldConfig.minLength} символ${getSuffix(
          fieldConfig.minLength
        )}.`
      );
    }

    if (fieldConfig.maxLength && value.length > fieldConfig.maxLength) {
      errors.push(
        `Максимальная длина ${fieldConfig.maxLength} символ${getSuffix(
          fieldConfig.maxLength
        )}.`
      );
    }

    if (fieldConfig.pattern && !fieldConfig.pattern.test(value)) {
      errors.push("Неверный формат.");
    }

    this.errors[field.name] = errors;
    this.displayErrors(field, errors);
  }

  validateForm() {
    const fields = this.form.querySelectorAll("input, textarea, select");
    fields.forEach((field) => {
      if (this.config[field.name]) {
        this.validateField(field);
      }
    });
    this.updateSubmitButtonState();
  }

  displayErrors(field, errors) {
    let errorContainer = field.nextElementSibling;
    if (
      !errorContainer ||
      !errorContainer.classList.contains("error-message")
    ) {
      errorContainer = document.createElement("div");
      errorContainer.className = "error-message";
      field.after(errorContainer);
    }

    errorContainer.innerHTML = errors.join("<br>");
  }

  updateSubmitButtonState() {
    if (this.isValidForm()) {
      this.submitButton.classList.remove("disabled");
      this.submitButton.disabled = false;
    } else {
      this.submitButton.classList.add("disabled");
      this.submitButton.disabled = true;
    }
  }

  isValidForm() {
    return Object.values(this.errors).every(
      (errorList) => errorList.length === 0
    );
  }
}

export default FormValidator;

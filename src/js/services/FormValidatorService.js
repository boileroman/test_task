import FormValidator from "../FormValidator/formValidator.js";

export class FormValidatorService {
  static setup(form) {
    const config = {
      email: {
        type: "text",
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      message: {
        type: "text",
        required: false,
        minLength: 8,
        maxLength: 50,
      },
      fullName: {
        type: "text",
        required: true,
        minLength: 3,
        maxLength: 15,
      },
    };

    return new FormValidator(form, config);
  }
}

export default FormValidatorService;

import validator from "validator";
import message from "../../messages/auth";

const validateEmail = (email) => {
  if (validator.isEmpty(email)) {
    return {
      success: false,
      message: message.EMAIL_DOSE_NOT_EXIST,
    };
  }

  if (!email.trim().length) {
    return {
      success: false,
      message: message.EMAIL_DOSE_NOT_EXIST,
    };
  }

  if (!validator.isEmail(email)) {
    return {
      success: false,
      message: message.EMAIL_INVALID,
    };
  }

  return {
    success: true,
  };
};

const validatePassword = (password) => {
  if (validator.isEmpty(password)) {
    return {
      success: false,
      message: message.PASSWORD_DOSE_NOT_EXIST,
    };
  }

  if (!password.trim().length) {
    return {
      success: false,
      message: message.PASSWORD_DOSE_NOT_EXIST,
    };
  }

  const regexHasNumber = /\d/g;
  if (!regexHasNumber.test(password)) {
    return {
      success: false,
      message: message.PASSWORD_MUST_HAVE_ONE_NUMBER,
    };
  }

  const regexHasLetter = /[a-zA-Z]/g;
  if (!regexHasLetter.test(password)) {
    return {
      success: false,
      message: message.PASSWORD_MUST_HAVE_ONE_LETTER,
    };
  }

  return {
    success: true,
  };
};

const validationRegister = (info) => {
  const resultValidateEmail = validateEmail(info.email);
  if (!resultValidateEmail.success) {
    return resultValidateEmail;
  }

  const resValidatePassword = validatePassword(info.password);
  if (!resValidatePassword.success) {
    return resValidatePassword;
  }

  const password = info.password;
  const repeatPassword = info.repeat_password;

  if (password !== repeatPassword) {
    return {
      success: false,
      message: message.PASSWORD_DOSE_NOT_MATCH,
    };
  }

  return {
    success: true,
  };
};

export default validationRegister;

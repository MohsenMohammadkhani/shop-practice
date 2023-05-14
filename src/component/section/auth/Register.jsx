import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import registerValidation from "../../../validation/auth/register";
import HeaderRequestHelper from "../../../helpers/HeaderRequest";
import HttpService from "../../../services/Http";
import helpersSpinner from "../../../helpers/spinner";
import authMessage from "../../../messages/auth";
import SignInWithGoogle from "./SignInWithGoogle";

function Register() {
  const [message, setMessage] = useState();
  const [IAgreeTermsCheckBox, setIAgreeTermsCheckBox] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const flushMessage = () => {
    setMessage();
  };

  const generateMessageForm = () => {
    if (!message) {
      return;
    }
    return (
      <div className={`${message.type_class}`}>
        <i className={`${message.class_icon} pl-2`}></i>
        <span>{message.text}</span>
      </div>
    );
  };

  const sendForm = async () => {
    const formData = getDataForm();
    const resultRegisterValidation = registerValidation(formData);
    if (!resultRegisterValidation.success) {
      setMessage({
        type_class: "alert alert-danger",
        text: resultRegisterValidation.message,
        class_icon: "fa fa-exclamation-triangle",
      });
      return;
    }

    flushMessage();

    helpersSpinner.showSpinner("register-box");
    const resultSendRequestRegisterUser = await sendRequestRegisterUser(
      formData
    );
    helpersSpinner.removeSpinner("register-box");

    if (!resultSendRequestRegisterUser) {
      return;
    }
    toast.success(authMessage.YOUR_REGISTER_IS_DONE_SUCCESSFULLY, {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const sendRequestRegisterUser = async (bodyRequest) => {
    let headersRequest = HeaderRequestHelper.getHeaderForRequest();
    try {
      await HttpService.postRequest(
        process.env.REACT_APP_DOMAIN_API +
          "/api/v1/auth/register-with-credentials",
        bodyRequest,
        headersRequest
      );
    } catch (error) {
      alert(error.response.data.message);
      return false;
    }

    return true;
  };

  const getDataForm = () => {
    return {
      email: document.querySelector("#email").value.trim(),
      password: document.querySelector("#password").value.trim(),
      repeat_password: document.querySelector("#repeat-password").value.trim(),
    };
  };

  return (
    <div className="register-box">
      <div className="card">
        <div className="card-body register-card-body">
          <p className="login-box-msg">ثبت نام</p>
          {message && generateMessageForm()}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendForm();
            }}
          >
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="ایمیل یا شماره موبایل خود را وارد کنید."
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="form-control"
                placeholder="رمز عبور خود را وارد کنید."
                required
              />
              <div
                className="input-group-append hover"
                onClick={() => {
                  setShowPassword((prevState) => !prevState);
                }}
              >
                <div className="input-group-text">
                  <span
                    className={`fas ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type={showRepeatPassword ? "text" : "password"}
                name="repeat-password"
                id="repeat-password"
                className="form-control"
                placeholder="تکرار رمز عبور خود را وارد کنید."
                required
              />
              <div
                className="input-group-append hover"
                onClick={() => {
                  setShowRepeatPassword((prevState) => !prevState);
                }}
              >
                <div className="input-group-text">
                  <span
                    className={`fas ${
                      showRepeatPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <div className="icheck-primary">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="terms"
                    className="hover"
                    onChange={(e) => {
                      setIAgreeTermsCheckBox((prevState) => !prevState);
                    }}
                  />
                  <label className="pr-2">
                    من تمامی <a href="#">شرایط</a> را میپذیرم
                  </label>
                </div>
              </div>
              <div className="col-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={!IAgreeTermsCheckBox}
                >
                  ثبت نام
                </button>
              </div>
            </div>
          </form>

          <hr />
          <SignInWithGoogle
            redirectUri={`${process.env.REACT_APP_DOMAIN_API}/api/v1/auth/register-with-google`}
          />

          <Link to={"/auth/login"} className="text-center">
            ورود
          </Link>
        </div>
      </div>
      <div id="toast">
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;

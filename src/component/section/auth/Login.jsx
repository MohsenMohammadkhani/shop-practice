import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import loginValidation from "../../../validation/auth/login";
import HeaderRequestHelper from "../../../helpers/HeaderRequest";
import HttpService from "../../../services/Http";
import helpersSpinner from "../../../helpers/spinner";
import authMessage from "../../../messages/auth";
import SignInWithGoogle from "./SignInWithGoogle";

function Login() {
  const [message, setMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);

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
    const resultLoginValidation = loginValidation(formData);
    if (!resultLoginValidation.success) {
      setMessage({
        type_class: "alert alert-danger",
        text: resultLoginValidation.message,
        class_icon: "fa fa-exclamation-triangle",
      });
      return;
    }
    flushMessage();

    helpersSpinner.showSpinner("login-box");
    const resultSendRequestLoginUser = await sendRequestLoginUser(formData);
    helpersSpinner.removeSpinner("login-box");

    if (!resultSendRequestLoginUser) {
      return;
    }
    toast.success(authMessage.YOUR_LOGIN_IS_DONE_SUCCESSFULLY, {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const sendRequestLoginUser = async (bodyRequest) => {
    let headersRequest = HeaderRequestHelper.getHeaderForRequest();
    try {
      await HttpService.postRequest(
        process.env.REACT_APP_DOMAIN_API +
          "/api/v1/auth/login-with-credentials",
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
    };
  };

  return (
    <div className="login-box">
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">ورود</p>
          {message && generateMessageForm()}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendForm();
            }}
          >
            <div className="input-group mb-3">
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="ایمیل یا شماره موبایل خود را وارد کنید."
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="رمز عبور خود را وارد کنید."
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
                  ‍‍‍
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">
                  ورود
                </button>
              </div>
            </div>
          </form>

          <hr />
          <SignInWithGoogle
            redirectUri={`${process.env.REACT_APP_DOMAIN_API}/api/v1/auth/login-with-google`}
            labelButton="ورود با گوگل"
          />
          <p className="mb-1">
            <a href="forgot-password.html">رمز عبور خود را فراموش کرده ام.</a>
          </p>
          <p className="mb-0">
            <Link to={"/auth/register"} className="text-center">
              ثبت نام
            </Link>
          </p>
        </div>
      </div>
      <div id="toast">
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;

import React from "react";
import helpersNumbers from "../../../helpers/numbers";

export default function SignInWithGoogle({ redirectUri, labelButton }) {
  const singInWithGoogle = async () => {
    const queryString = getQueryStringForRequest();
    window.location.replace(
      `https://accounts.google.com/o/oauth2/v2/auth${queryString}`
    );
  };

  const getQueryStringForRequest = () => {
    return (
      "?" +
      new URLSearchParams({
        response_type: "code",
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        redirect_uri: redirectUri,
        scope: "openid email",
        state: helpersNumbers.generateTextPrice(10),
      }).toString()
    );
  };

  return (
    <div
      onClick={() => {
        singInWithGoogle();
      }}
      className="social-auth-links text-center mb-3"
    >
      <span href="#" className="btn btn-block btn-danger">
        {labelButton}
      </span>
    </div>
  );
}

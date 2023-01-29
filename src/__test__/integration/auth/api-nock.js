import nock from "nock";
import authMessage from "../../../messages/auth";
import config from "../../config";

const headerForNock = {
  "access-control-allow-origin": "*",
  "access-control-allow-credentials": "true",
};

const initScopeNock = () => {
  nock(config.domain_api)
    .persist()
    .defaultReplyHeaders(headerForNock)
    .post("/api/v1/auth/register-with-credentials")
    .reply(201, [
      {
        success: true,
        message: authMessage.YOUR_REGISTER_IS_DONE_SUCCESSFULLY,
      },
    ]);

  nock(config.domain_api)
    .persist()
    .defaultReplyHeaders(headerForNock)
    .post("/api/v1/auth/login-with-credentials")
    .reply(201, [
      {
        success: true,
        message: authMessage.YOUR_LOGIN_IS_DONE_SUCCESSFULLY,
      },
    ]);
};

export default {
  initScopeNock,
};

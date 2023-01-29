import React from "react";
import nockAPI from "./api-nock";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import testingLibraryReactHelper from "../../helper/testing-library-react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "../../../component/section/auth/Login";
import authMessage from "../../../messages/auth";

describe("test for login with credentials component", () => {
  beforeAll(() => {
    nockAPI.initScopeNock();
  });

  test("show register success toast when user submit Login button", async () => {
    const dom = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const email = "mohsenmohammadkhanigla@gmail.com";
    const password = "123456asd";

    userEvent.type(screen.getByRole("textbox"), email);
    userEvent.type(
      screen.getByPlaceholderText(/رمز عبور خود را وارد کنید\./i),
      password
    );

    const button = screen.getByRole("button", {
      name: /ورود/i,
    });
    userEvent.click(button);
    expect(
      await screen.findByText(authMessage.YOUR_LOGIN_IS_DONE_SUCCESSFULLY)
    ).toBeInTheDocument();
  });
});

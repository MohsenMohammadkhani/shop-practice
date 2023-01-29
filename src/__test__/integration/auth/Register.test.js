import React from "react";
import nockAPI from "./api-nock";
import { MemoryRouter } from "react-router-dom";
import {
  render,
  screen,
} from "@testing-library/react";
import testingLibraryReactHelper from "../../helper/testing-library-react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Register from "../../../component/section/auth/Register";
import authMessage from "../../../messages/auth";

describe("test for login with credentials component", () => {
  beforeAll(() => {
    nockAPI.initScopeNock();
  });

  test("show register success toast when user submit register button", async () => {
    const dom = render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const email = "mohsenmohammadkhanigla@gmail.com";
    const password = "123456asd";

    userEvent.type(screen.getByRole("textbox"), email);
    userEvent.type(testingLibraryReactHelper.getElementById(dom.container, "password"), password);

    userEvent.type(
      screen.getByPlaceholderText(/تکرار رمز عبور خود را وارد کنید\./i),
      password
    );
    userEvent.click(screen.getByRole("checkbox"), password);

    const button = screen.getByRole("button", {
      name: /ثبت نام/i,
    });
    userEvent.click(button);
    expect(
      await screen.findByText(authMessage.YOUR_REGISTER_IS_DONE_SUCCESSFULLY)
    ).toBeInTheDocument();
  });
});

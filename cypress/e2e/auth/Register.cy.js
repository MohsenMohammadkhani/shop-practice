describe("test Register component", () => {
  it("test Register component", () => {
    const email = "mohsenmohammadkhanigla@gmail.com";
    const password = "asdASD123";
    cy.intercept(
      "POST",
      "http://localhost:8000/api/v1/auth/register-with-credentials",
      {
        statusCode: 200,
        body: {
          email: email,
          password: password,
        },
        response: {
          success: true,
          message: "ثبت شما با موفقیت انجام شد.",
        },
      }
    );

    cy.visit("http://localhost:3000/auth/register");
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#repeat-password").type(password);
    cy.get("#agreeTerms").click();
    cy.get(".btn.btn-primary")
      .click()
      .get("#toast .Toastify__toast-body div")
      .should("have.text", "ثبت شما با موفقیت انجام شد.");
  });
});

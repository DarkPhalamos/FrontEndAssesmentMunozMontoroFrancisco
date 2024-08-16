/// <reference types="cypress" />

describe("Authentication", () => {

  beforeEach(() => {
    cy.visit("/");
    cy.window().then((window: any) => {
      window.store.dispatch({
        type: "auth/login",
        payload: { username: "Bret", password: "validPassword", userId: 1 },
      });
    });
  });

  it("should login with valid credentials", () => {
    cy.visit("/login");
    cy.get('input[name="username"]').type("Bret");
    cy.get('input[name="password"]').type("validPassword");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");
    cy.contains("Logout").should("be.visible");
  });

  it("should not login with invalid credentials", () => {
    cy.visit("/login");
    cy.get('input[name="username"]').type("invalidUser");
    cy.get('input[name="password"]').type("invalidPassword");
    cy.get('button[type="submit"]').click();
    cy.contains("Wrong user or password.").should("be.visible");
    cy.url().should("include", "/login");

  });
  

  it("should logout correctly", () => {
   
    cy.get("button").contains("Logout").click();
  });
});

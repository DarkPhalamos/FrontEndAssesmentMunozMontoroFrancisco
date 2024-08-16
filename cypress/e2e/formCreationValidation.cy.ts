/// <reference types="cypress" />

describe("Post Creation Form Validation", () => {
  beforeEach(() => {
    cy.visit("/posts/create");
    cy.window().then((window: any) => {
      window.store.dispatch({
        type: "auth/login",
        payload: { username: "Bret", password: "validPassword", userId: 1 },
      });
    });
  });

  it("should show an error message if the title is empty", () => {
    cy.get("textarea[name='body']").type("This is a valid body content");
    cy.get(".addButton").click();

    cy.contains("Title Required").should("be.visible");

    cy.url().should("include", "/posts/create");
  });
});

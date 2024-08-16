/// <reference types="cypress" />

describe("Post Edit Form Validation", () => {
  const postId = 1; 

  beforeEach(() => {
    cy.visit(`/posts/${postId}/edit`);
    cy.window().then((window: any) => {
      window.store.dispatch({
        type: "auth/login",
        payload: { username: "Bret", password: "validPassword", userId: 1 },
      });
    });
  });

  it("should show an error message if the title is empty when editing", () => {
    cy.get('input[name="title"]').clear(); 
    cy.get(".editButton").click();

    cy.contains("Title Required").should("be.visible");

    cy.url().should("include", `/posts/${postId}/edit`);
  });
});

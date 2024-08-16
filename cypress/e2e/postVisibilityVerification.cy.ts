/// <reference types="cypress" />

describe("Post Comments Visibility", () => {
  const postId = 1;

  beforeEach(() => {
    cy.visit(`/posts/${postId}`);
    cy.window().then((window: any) => {
      window.store.dispatch({
        type: "auth/login",
        payload: { username: "Bret", password: "validPassword", userId: 1 },
      });
    });
  });

  it("should show comments when authenticated", () => {
    cy.get("ul").should("be.visible");
    cy.contains("Auth Required to View Comments").should("not.exist");
  });

  it("should show 'Auth Required to View Comments' when not authenticated", () => {
    cy.window().then((window: any) => {
      window.store.dispatch({
        type: "auth/logout",
      });
    });

    cy.visit(`/posts/${postId}`);

    cy.contains("Auth Required to View Comments").should("be.visible");

    
  });
});

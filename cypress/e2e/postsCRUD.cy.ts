/// <reference types="cypress" />
describe("Post CRUD", () => {
  const username = "validUser";
  const password = "validPassword";

  beforeEach(() => {
    cy.visit("/posts");
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

  it("should create a new post", () => {
    cy.get(".button-add").click();
    cy.get('input[name="title"]').type("New Post");
    cy.get('textarea[name="body"]').type(
      "This is the content of the new post."
    );
    cy.get(".addButton").click();
    cy.wait(2000);
    cy.contains("New Post").should("be.visible");
  });

  it("should edit a post", () => {
    cy.get("button").contains("Edit").first().click();
    cy.get('input[name="title"]').clear().type("Updated Post Title");
    cy.get('textarea[name="body"]').clear().type("Updated content.");
    cy.get(".editButton").click();
    cy.wait(2000);
    cy.contains("Updated Post Title").should("be.visible");
  });

  it("should delete a post", () => {
    let postTitleToDelete = "";

    cy.get(".table tbody tr")
      .first()
      .within(() => {
        cy.get("td")
          .first()
          .invoke("text")
          .then((text) => {
            postTitleToDelete = text.trim();
          });
      })
      .then(() => {
        cy.log(postTitleToDelete);

        if (postTitleToDelete) {
          cy.get("button").contains("Delete").click();

          cy.get(".deleteButton").click();

          cy.contains(postTitleToDelete).should("not.exist");
        } else {
          throw new Error("postTitleToDelete no fue asignado correctamente");
        }
      });
  });
});

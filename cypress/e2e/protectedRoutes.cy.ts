describe("Protected Routes", () => {
  it("should redirect to login if trying to access protected page without authentication", () => {
    cy.visit("/posts/create");
    cy.url().should("include", "/login"); 

     cy.visit("/posts/1/edit");
     cy.url().should("include", "/login");

     cy.visit("/posts/1/delete");
     cy.url().should("include", "/login");
  });
});

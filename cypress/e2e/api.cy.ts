describe("API Error Handling - 404", () => {
const postId = 200; 

  it("should show an error message when the API returns a 404 error for a post", () => {
    cy.intercept("GET", "**/posts/${postId}", {
      statusCode: 404,
      body: { error: "Error loading post" },
    }).as("getPost");

    cy.visit(`/posts/${postId}/`);

    cy.contains("Error loading post").should("be.visible");
  });
});


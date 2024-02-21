describe("trello check", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/login");
    cy.wait(2000);
    // Enter the email
    cy.get('[data-id="email"]').type("malik@gmail.com");
    cy.wait(2000);
    // Enter the password
    cy.get('[data-id="password"]').type("00000000");
    cy.wait(2000);
    // Submit the form
    cy.get('[data-id="loginbtn"]').click();
    cy.wait(2000);
    // add column
    cy.get('[data-columnId="addColumn"]').click();
    cy.wait(4000);
    // edit column
    cy.get('div[data-title="columnTitle"]').click();
    cy.get('input[data-columnId="title"]').clear().type("new column");
  });
});

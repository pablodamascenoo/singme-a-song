Cypress.Commands.add("resetAndSeed", () => {
  cy.request("POST", `http://localhost:5000/test/reset`).then(() => {
    cy.request("POST", `http://localhost:5000/test/seed`).then(() => {});
  });
});

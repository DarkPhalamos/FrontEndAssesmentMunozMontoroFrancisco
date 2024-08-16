import i18n from "../../src/i18n"; 
import "./commands"; 

Cypress.Commands.add("getTranslation", (key: string) => {
  return cy.wrap(i18n.t(key));
});

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      getTranslation(key: string): Chainable<string>;
    }
  }
}

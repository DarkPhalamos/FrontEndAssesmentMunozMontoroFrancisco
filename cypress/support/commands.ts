import i18n from "i18next";
import translationEN from "../../src/translations/en/translation.json";
import translationES from "../../src/translations/es/translation.json";

i18n.init({
  resources: {
    en: { translation: translationEN },
    es: { translation: translationES },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

Cypress.Commands.add("getTranslation", (key: string) => {
  return cy.wrap(i18n.t(key));
});

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.visit("/login");
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should("not.include", "/login");
  
});

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      getTranslation(key: string): Chainable<string>;
      login(username: string, password: string): Chainable<void>;
    }
  }
}

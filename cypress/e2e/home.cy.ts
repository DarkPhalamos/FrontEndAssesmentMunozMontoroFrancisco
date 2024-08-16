/// <reference types="cypress" />

import i18n from "../../src/i18n";

describe("Home Page", () => {
  it("should load the home page and display the h2 title in English", () => {
    cy.visit("/");
    cy.log("Página cargada");
    cy.log(i18n.language);

    cy.screenshot();

    cy.getTranslation("lastPost").then((translatedText) => {
      cy.contains(translatedText).should("be.visible");
    });
  });

  it("should display the h2 title in Spanish", () => {
    cy.visit("/");

    cy.get("select").select("Español");

    cy.wrap(i18n)
      .invoke("changeLanguage", "es")
      .then(() => {
        cy.log(i18n.language);
        const translatedText = i18n.t("lastPost");
        cy.log(translatedText);
        cy.contains(translatedText).should("be.visible");
      });
  });
});

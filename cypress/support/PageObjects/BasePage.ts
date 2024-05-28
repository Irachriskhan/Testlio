/// <reference types="cypress" />

class BasePage {
  navigateToSite(url: string) {
    cy.visit(url);
    cy.url().should("eq", url); // Assert url redirection
  }

  assertElement(elem: string, value: string, options?: object | string): any {
    return cy.get(elem).should(value, options);
  }

  verifyElementContent(elem: string, value1: string, value2: string): void {
    cy.get(elem).contains(value1).should(value2);
  }

  clickElement(elem: string): Cypress.Chainable {
    return cy.get(elem).click();
  }

  waiting(value: number): void {
    cy.wait(value);
  }

  verifyContent(elem: string, value: string): Cypress.Chainable {
    return cy.get(elem).contains(value);
  }

  searchElement(elem: string, subEelem: string): Cypress.Chainable {
    return cy.get(elem).find(subEelem);
  }

  getElement(elem: string) {
    return cy.get(elem);
  }

  getText(elem: JQuery<any>, subElem: string): string {
    return Cypress.$(elem).find(subElem).text();
  }
}

export default BasePage;

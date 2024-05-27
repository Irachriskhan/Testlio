class LumaPage {
  getContains(elem: string, value: string): Cypress.Chainable {
    return cy.get(elem).contains(value);
  }

  getContainsShould(elem: string, value1: string, value2: string): void {
    cy.get(elem).contains(value1).should(value2);
  }

  waiting(value: number): void {
    cy.wait(value);
  }
  getFind(elem: string, subEelem: string): Cypress.Chainable {
    return cy.get(elem).find(subEelem);
  }

  getClick(elem: string): Cypress.Chainable {
    return cy.get(elem).click();
  }

  getFindType(elem: string, subElem: string, value: string): Cypress.Chainable {
    return cy.get(elem).find(subElem).type(value);
  }

  getShould(elem: string, value: string, options?: object | string): any {
    return cy.get(elem).should(value, options);
  }

  getElem(elem: string) {
    return cy.get(elem);
  }

  getText(elem: JQuery<any>, subElem: string): string {
    return Cypress.$(elem).find(subElem).text();
  }

  redirection(option: string, url: string): void {
    cy.url().should(option, url);
  }

  // CHECKOUT PAGE
  getCheckoutSteps(): Cypress.Chainable {
    return cy.get("#checkoutSteps");
  }

  fillCheckoutFields(locator: string, value: string) {
    const element = this.getCheckoutSteps().find(locator);
    if (locator.includes("select")) {
      element.select(value);
    } else {
      element.type(value, { force: true });
    }
  }
}

export default LumaPage;

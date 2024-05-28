/// <reference types="cypress" />

class CheckoutPage {
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

export default CheckoutPage;

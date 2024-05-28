import BasePage from "../support/PageObjects/BasePage";
import CheckoutPage from "../support/PageObjects/CheckoutPage";
const basePage = new BasePage();
const checkoutPage = new CheckoutPage();

describe("Test Testlio Platform", function () {
  beforeEach(function () {
    cy.fixture("lumaLocators").as("locators");
    cy.fixture("lumaTestData").as("values");
  });

  it("week5 Test: Visit Testlio then go to  about page", () => {
    cy.fixture("testlioData").then((data) => {
      // visit Testlio
      basePage.navigateToSite(data.testlioUrl);
      // Get and print the title to console
      cy.title({ log: true }).should("eq", data.title);
      // click on About
      basePage.verifyContent(data.ul_li, "About").click();
      // Visit Learn more link
      basePage.searchElement(data.ul_li, data.aboutUs).click();
      // Find and print "Fused testing" heading
      cy.get(data.fused, {
        log: true,
      }).should("be.visible");
    });
  });

  it.only("Purchase and checkout items for shipping", function () {
    // Step-1: Navigate to Luma website
    basePage.navigateToSite(this.values.url);

    // Step-2: Validate the home page
    // Assert on the banner’s visibility
    basePage.assertElement(this.locators.banner, "be.visible");
    // Assert on the Hot sellers products
    basePage.verifyElementContent(
      this.locators.hotSeller,
      this.values.hotSeller,
      "be.visible"
    );
    // Assert on the search button
    basePage.assertElement(this.locators.search, "be.visible");
    // Assert on the top navigation
    basePage.assertElement(this.locators.navigation, "be.visible");

    //Step-3: Navigate to Gear and select Fitness equipment on top navigation
    basePage
      .verifyContent(this.locators.gear, this.values.gear)
      .trigger("mouseover");
    // Go to Fitness Equipment page
    basePage
      .verifyContent(this.locators.fitness, "Fitness Equipment") // this.values.fitness
      .should("be.visible")
      .click();
    // Assert all products
    basePage.getElement(this.locators.allProducts).should(($li) => {
      expect($li).to.have.length(11);
    });

    // Step-4: Select any random item and click on add to cart
    // Capture the product name & price .products.list.items.product-items
    basePage.getElement(this.locators.secondProduct).then((element) => {
      // capture the price of the product
      let price = basePage.getText(element, this.locators.productPrice);
      // capture the name of the product
      let name = basePage.getText(element, this.locators.productName);
      //  Log the name and the price of the product
      cy.log(name + " : " + price);
    });
    // Item should be added to cart and counter to be increased by +1
    basePage.getElement(this.locators.addToCart).trigger("mouseover").click();
    // Clear the quantity field and type 1
    basePage.getElement(this.locators.quantity).each(($el) => {
      cy.wrap($el).clear().type("1");
    });
    // Add to cart the product
    basePage.clickElement(this.locators.addCartBtn);

    // Step-5: Click on mini cart icon
    basePage.waiting(10000); // wait for the item to be added for 3 seconds
    // Click on the cart Icon
    basePage.clickElement(this.locators.cartIcon);
    // Assert on the visibility all the products ,prices added to cart
    basePage.getElement(this.locators.cartDesc).should("have.class", "active");
    // Verify if there is number of items
    basePage
      .searchElement(this.locators.itemsId, this.locators.totalItems)
      .should("not.be.empty");
    // Verify if there is amount of items
    basePage
      .searchElement(this.locators.itemsId, this.locators.totalAmount)
      .should("not.be.empty");
    // Assert on visibility of Proceed to checkout button
    basePage.assertElement(this.locators.checkoutBtn, "be.visible", {
      force: true,
    });

    // Step-6: Click on Proceed to checkout button
    // Redirect to Shipping address page
    basePage.clickElement(this.locators.checkoutBtn);
    basePage.waiting(3000);
    //   Assert redirection
    basePage.navigateToSite(`${this.locators.url}checkout/#shipping`);
    basePage.waiting(10000);

    // Step-7: Fill it all the mandatory details and navigate to payments page
    // Enter the email address
    basePage
      .searchElement(this.locators.shippingField, this.locators.shippingEmail)
      .type(this.values.shippingEmail, { force: true });
    // Filling shipping details
    this.values.fields.forEach((field: { locator: string; value: string }) => {
      checkoutPage.fillCheckoutFields(field.locator, field.value);
    });
    // Check Shiping Method
    basePage.waiting(6000);
    basePage.getElement(this.locators.shippingFee).check();
    // navigate to the payment page
    basePage
      .verifyContent(this.locators.toPayment, "Next")
      .click({ timeout: 10000 });
    // Assert on the product summary
    basePage.waiting(10000);
    basePage.assertElement("div#opc-sidebar", "be.visible");
    // Assert on the product price
    basePage
      .searchElement("div#opc-sidebar", this.locators.prodPrice)
      .should("be.not.empty");

    // Step-8: Click on Place order
    // Assert on the success notes of the order
    basePage.assertElement(this.locators.orderSuccess, "be.visible");
    // wait the page to load
    basePage.waiting(6000);
    // Assert on the visibility of the order number
    basePage
      .assertElement(this.locators.orderButton, "be.visible")
      .and("not.be.empty")
      .click();
    // Assert on the continue shopping button
    basePage.assertElement(this.locators.shoppingBtn, "be.visible").click();
  });
});

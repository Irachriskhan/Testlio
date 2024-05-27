import LumaPage from "../support/PageObjects/LumaPage";
const Luma = new LumaPage();

describe("Test Testlio Platform", () => {
  it("week5 Test: Visit Testlio then go to  about page", () => {
    cy.fixture("testlioData").then((data) => {
      // visit Testlio
      cy.visit(data.testlioUrl);
      // Get and print the title to console
      cy.title({ log: true }).should("eq", data.title);
      // click on About
      cy.get(data.ul_li).contains("About").click();
      // Visit Learn more link
      cy.getFind(data.ul_li, data.aboutUs).click();
      // Find and print "Fused testing" heading
      cy.get(data.fused, {
        log: true,
      }).should("be.visible");
    });
  });

  it.only("Purchase and checkout items for shipping", () => {
    cy.fixture("lumaData").then((data) => {
      // Step-1: Navigate to Luma website
      cy.visit(data.LumaWebsite);
      // Assert url redirection
      Luma.redirection("eq", data.LumaWebsite);

      // Step-2: Validate the home page
      // Assert on the banner’s visibility
      Luma.getShould(data.banner, "be.visible");
      // Assert on the Hot sellers products section div.column.main
      Luma.getContainsShould(data.hotSeller, data.hotSellerTitle, "be.visible");
      // Assert on the search button
      Luma.getShould(data.search, "be.visible");
      // Assert on the top navigation
      Luma.getShould(data.navigation, "be.visible");

      //Step-3: Navigate to Gear and select Fitness equipment on top navigation
      Luma.getContains(data.gearId, data.gear).trigger("mouseover");
      // Go to Fitness Equipment page
      Luma.getContains(data.fitnessId, data.fitness)
        .should("be.visible")
        .click();
      // Assert all products
      Luma.getElem(data.allProducts).should(($li) => {
        expect($li).to.have.length(11);
      });

      // Step-4: Select any random item and click on add to cart
      // Capture the product name & price .products.list.items.product-items
      Luma.getElem(data.secondProduct).then((element) => {
        // capture the price of the product
        let price = Luma.getText(element, data.productPrice);
        // capture the name of the product
        let name = Luma.getText(element, data.productName);
        //  Log the name and the price of the product
        cy.log(name + " : " + price);
      });
      // Item should be added to cart and counter to be increased by +1
      Luma.getElem(data.addToCart).trigger("mouseover").click();
      // Clear the quantity field and type 1
      Luma.getElem(data.quantity1).clear().type("1");
      // Add to cart the product
      Luma.getClick(data.addCartBtn);

      // Step-5: Click on mini cart icon
      Luma.waiting(10000); // wait for the item to be added for 3 seconds
      // Click on the cart Icon
      Luma.getClick(data.cartIcon);
      // Assert on the visibility all the products ,prices added to cart
      Luma.getElem(data.cartDesc).should("have.class", "active");
      // Verify if there is number of items
      Luma.getFind(data.itemsId, data.totalItems).should("not.be.empty");
      // Verify if there is amount of items
      Luma.getFind(data.itemsId, data.totalAmount).should("not.be.empty");
      // Assert on visibility of Proceed to checkout button
      Luma.getShould(data.checkoutBtn, "be.visible", { force: true });

      // Step-6: Click on Proceed to checkout button
      // Redirect to Shipping address page
      Luma.getClick(data.checkoutBtn);
      Luma.waiting(3000);
      //   Assert redirection
      Luma.redirection("eq", `${data.LumaWebsite}checkout/#shipping`);
      Luma.waiting(10000);

      // Step-7: Fill it all the mandatory details and navigate to payments page
      // Enter the email address
      Luma.getFind(data.shippingField, data.shippingEmailId).type(
        data.shippingEmail,
        { force: true }
      );
      // Filling shipping details
      data.fields.forEach((field: { locator: string; value: string }) => {
        Luma.fillCheckoutFields(field.locator, field.value);
      });
      // Check Shiping Method
      Luma.waiting(6000);
      Luma.getElem(data.shippingFee).check();
      // navigate to the payment page
      Luma.getContains(data.toPayment, "Next").click({ timeout: 10000 });
      // Assert on the product summary
      Luma.waiting(10000);
      Luma.getShould("div#opc-sidebar", "be.visible");
      // Assert on the product price
      Luma.getFind("div#opc-sidebar", data.prodPrice).should("be.not.empty");

      // Step-8: Click on Place order
      // Assert on the success notes of the order
      Luma.getShould(data.orderSuccess, "be.visible");
      // wait the page to load
      Luma.waiting(6000);
      // Assert on the visibility of the order number
      Luma.getShould(data.orderButton, "be.visible")
        .and("not.be.empty")
        .click();
      // Assert on the continue shopping button
      Luma.getShould(data.shoppingBtn, "be.visible").click();
    });
  });
});

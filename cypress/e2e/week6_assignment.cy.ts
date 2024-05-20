describe("Automation Test of Luma website", () => {
  it("Purchase and checkout items for shipping", () => {
    // Step-1: Navigate to https://magento.softwaretestingboard.com/ url

    cy.visit("https://magento.softwaretestingboard.com/");
    // Assert url redirection
    cy.url().should("eq", "https://magento.softwaretestingboard.com/");

    // Step-2: Validate the home page

    // Assert on the banner’s visibility
    cy.get(
      "div.page-wrapper:nth-child(5) header.page-header div.header.content > a.logo"
    ).should("be.visible");
    // Assert on the Hot sellers products section
    cy.get(
      "div.column.main div.widget.block.block-static-block:nth-child(5) > div.content-heading:nth-child(2)"
    )
      .contains("Hot Sellers")
      .should("be.visible");
    // Assert on the search button
    cy.get("#search").should("be.visible");
    // Assert on the top navigation
    cy.get("#ui-id-2").should("be.visible");

    //Step-3: Navigate to Gear and select Fitness equipment on top navigation

    cy.get("#ui-id-6").contains("Gear").trigger("mouseover");
    // Go to Fitness Equipment page
    cy.get("#ui-id-26")
      .contains("Fitness Equipment")
      .should("be.visible")
      .click();

    cy.get(
      "div.products.wrapper.grid.products-grid:nth-child(4) > ol.products.list.items.product-items li"
    ).should(($li) => {
      expect($li).to.have.length(11);
    });

    // Step-4: Select any random item and click on add to cart

    // Capture the product name & price
    cy.get(
      "ol.products.list.items.product-items li.item.product.product-item:nth-child(2) div.product-item-info > div.product.details.product-item-details:nth-child(2)"
    ).then((element) => {
      // capture the price of the product
      let price = Cypress.$(element)
        .find("span.price-container.tax.weee span.price-wrapper > span.price")
        .text();
      // capture the name of the product
      let name = Cypress.$(element)
        .find("strong.product.name.product-item-name > a.product-item-link")
        .text();
      //  Log the name and the price of the product
      cy.log("The product name and  price are ", name, price);
    });

    // Item should be added to cart and counter to be increased by +1
    cy.get(
      "ol.products.list.items.product-items li.item.product.product-item:nth-child(2) > div.product-item-info"
    )
      .trigger("mouseover")
      .click();
    // Clear the quantity field and type 1
    cy.get(
      "tbody:nth-child(3) tr:nth-child(1) td.col.qty:nth-child(2) div.control.qty > input.input-text.qty"
    )
      .clear()
      .type("1");

    // Add to cart the product
    cy.get("#product-addtocart-button").click();

    // Step-5: Click on mini cart icon

    cy.wait(3000); // wait for the item to be added for 3 seconds
    // Click on the cart Icon
    cy.get(
      "header.page-header div.header.content > div.minicart-wrapper"
    ).click();

    // Assert on the visibility all the products ,prices added to cart
    cy.get(
      "header.page-header div.header.content > div.minicart-wrapper"
    ).should("have.class", "active");

    // Verify if there is number of items
    cy.get("#ui-id-1")
      .find(
        "div.block-content div.items-total:nth-child(2) > span.count:nth-child(1)"
      )
      .should("not.be.empty");
    // Verify if there is amount of items
    cy.get("#ui-id-1")
      .find(
        " div.block-content div.subtotal:nth-child(3) div.amount.price-container span.price-wrapper > span.price"
      )
      .should("not.be.empty");

    // Assert on visibility of edit button
    // cy.get("header.page-header div.header.content > div.minicart-wrapper").find(
    //   "div.product-item-details div.product.actions div.primary > a.action.edit"
    // );
    // .should("have.attr", "title", "Edit item");
    // Assert on visibility of delete button
    // cy.get("header.page-header div.header.content > div.minicart-wrapper").find(
    //   "div.product-item-details div.product.actions div.primary > a.action.delete"
    // );
    // .should("have.attr", "title", "Remove item");

    // Assert on visibility of Proceed to checkout button
    cy.get("#top-cart-btn-checkout").should("be.visible", { force: true });

    // Step-6: Click on Proceed to checkout button

    // Should be redirected to Shipping address page
    cy.get("#top-cart-btn-checkout").click();
    cy.wait(3000);
    cy.url().should("eq", "https://magento.softwaretestingboard.com/checkout/");

    // Step-7: Fill it all the mandatory details and navigate to payments page
    // Assert on the address visibility

    // Assert on the product price and summary

    // Enter the email address
    cy.get("#customer-email").type("irachriskhan@gmail.com");
    // Enter the First name
    //  #shipping-new-address-form
    // #co-shipping-form
    cy.get("#checkoutSteps").find("input#VNR693X").type("Christophe");
    // Enter the Last name
    cy.get("#YK9V61X").type("Irakoze", { force: true });
    // Enter the Company
    cy.get("#AAMLPMR").type("Testlio");
    // Enter the Street Adress
    cy.get("#D0AIBH9").type("KN 25st").should("KN 25st").and("be.visible");
    cy.get("#M1ULOLE").type("54897").should("54897").and("be.visible");
    cy.get("#OVM8WFR").type("Bwoga").should("Bwoga").and("be.visible");
    // Enter the City name
    cy.get("#GQ209FV").type("Gitega");
    // Enter the Province
    cy.get("#BCCX116").type("Gitega");
    // Enter the Zip Code
    cy.get("#HQJYOOI").type("00000");
    // Select the Country
    cy.get("#AWKHJNH").select("Burundi");
    // Enter the Phone number
    cy.get("#P2PSFSY").type("250791615454");
    // Check Shiping Method
    cy.get(
      "table.table-checkout-shipping-method tbody:nth-child(2) tr.row td.col.col-method:nth-child(1) > input.radio"
    ).check();
    cy.get(
      "form.form.methods-shipping div.actions-toolbar:nth-child(3) div.primary > button.button.action.continue.primary"
    ).click();
  });
});

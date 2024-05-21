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

    cy.wait(10000); // wait for the item to be added for 3 seconds
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
    cy.wait(10000);
    // Step-7: Fill it all the mandatory details and navigate to payments page
    // Assert on the address visibility

    // Assert on the product price and summary

    // Enter the email address
    cy.get(
      "fieldset#customer-email-fieldset.fieldset div.field.required > div.control._with-tooltip"
    )
      .find("input#customer-email")
      .type("irachriskhan@gmail.com", {
        force: true,
      });
    // Enter the First name
    cy.get("form#co-shipping-form")
      .find("input[name='firstname']")
      .type("Christophe");
    // Enter the Last name
    cy.get("#checkoutSteps")
      .find("input[name='lastname']")
      .type("Irakoze", { force: true });
    // Enter the Company
    cy.get("#checkoutSteps").find("input[name='company']").type("Testlio");
    // Enter the Street Adress
    cy.get("#checkoutSteps")
      .find("input[name='street[0]']")
      .type("KN 25st")
      // .should("KN 25st")
      .should("be.visible");
    cy.get("#checkoutSteps")
      .find("input[name='street[1]']")
      .type("54897")
      // .should("54897")
      .should("be.visible");
    cy.get("#checkoutSteps")
      .find("input[name='street[2]']")
      .type("Bwoga")
      // .should("Bwoga")
      .should("be.visible");
    // Enter the City name
    cy.get("#checkoutSteps").find("input[name='city']").type("Gitega");
    // Enter the Province
    cy.get("#checkoutSteps").find("select[name='region_id']").select("Alaska");
    // Enter the Zip Code
    cy.get("#checkoutSteps").find("input[name='postcode']").type("00000");
    // Select the Country
    cy.get("#checkoutSteps")
      .find("select[name='country_id']")
      .select("Burundi");
    // Enter the Phone number
    cy.get("#checkoutSteps")
      .find("input[name='telephone']")
      .type("+250791615454");
    // Check Shiping Method
    cy.wait(6000);
    cy.get(
      "table.table-checkout-shipping-method tbody:nth-child(2) tr.row td.col.col-method:nth-child(1) > input.radio"
    ).check();
    // navigate to the payment page
    cy.get(
      "form.form.methods-shipping div.actions-toolbar:nth-child(3) div.primary > button.button.action.continue.primary"
    )
      .contains("Next")
      .click({ timeout: 10000 });

    // Assert on the product summary
    cy.wait(6000);
    cy.get("div#opc-sidebar").should("be.visible");
    // Assert on the product price
    cy.get("div#opc-sidebar")
      .find("td.amount>strong>span.price")
      .should("be.not.empty");

    // Step-8: Click on Place order
    // Assert on the success notes of the order
    cy.get(
      " div.payment-method._active div.payment-method-content div.payment-method-billing-address > div.checkout-billing-address"
    ).should("be.visible");
    // wait the page to load
    cy.wait(6000);
    // Assert on the visibility of the order number
    cy.get("button[title='Place Order']")
      .should("be.visible")
      .and("not.be.empty")
      .click();

    // Assert on the continue shopping button
    cy.get(
      "a.action.primary.continue[href='https://magento.softwaretestingboard.com/']"
    )
      .should("be.visible")
      .click();
  });
});

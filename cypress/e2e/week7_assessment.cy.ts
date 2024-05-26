describe("Test Testlio Platform", () => {
  it("week5 Test: Visit Testlio then go to  about page", () => {
    cy.fixture("week5").then((data) => {
      // visit Testlio
      cy.visit(data.testlioUrl);

      // Get and print the title to console
      cy.title({ log: true }).should("eq", data.title);

      // click on About
      cy.getElement(data.ul_li).contains("About").click();

      // Visit Learn more link
      cy.getElement(data.ul_li).find(data.aboutUs).click();

      // Find and print "Fused testing" heading
      cy.getElement(data.fused, {
        log: true,
      }).should("be.visible");
    });
  });
});

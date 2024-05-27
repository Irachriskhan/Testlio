describe("Test Testlio Platform", () => {
  it("Visit Testlio then go to learn more from about nav-link", () => {
    cy.visit("https://testlio.com/");
    // Print the title on console
    let title = cy
      .title()
      .should(
        "eq",
        "Your Trusted Software Testing Partner in Critical Moments - Testlio"
      );
    // Check the existance of the title and log it
    if (title) {
      cy.log(
        "Your Trusted Software Testing Partner in Critical Moments - Testlio"
      );
    }

    // Click on "About" dropdown from the top navigation
    cy.get("ul.nav__list>li")
      .contains("About")
      .click()
      .each(($element) => {
        cy.get("a[href='https://testlio.com/about-us/']").click();
        // .wait(10000)
        // .then(() => {
        //   cy.location().should((loc) => {
        //     expect(loc.pathname).to.eq("https://testlio.com/about-us/");
        //   });
        // });
        return false;
      });

    let heading = cy
      .get("h1#we-power-fused-software-testing-to-enable-human-possibilities")
      .should("be.visible");
    if (heading)
      cy.log("We power fused software testing to enable human possibilities");
  });
});

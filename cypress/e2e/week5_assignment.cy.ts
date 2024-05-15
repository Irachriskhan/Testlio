// Automate below test case:

// Launch the application testlio.com in the Chrome browser.
// On the homepage identify the test "Your trusted partner in critical testing moments"
// Print the text on console/terminal
// Click on "About" drop down from the top navigation.
// From the dropdown click on "Learn more"
// From the opened page capture the text "We power fused software testing to enable human possibilities."
// Print the text on console/terminal

describe("Test Testlio Platform", () => {
  // beforeEach(() => {
  //   // Visit the Testlio Website
  //   cy.visit("https://testlio.com/");
  // });

  it("Print the title in console", () => {
    cy.visit("https://testlio.com/");
    // Print the title on console
    let title = cy
      .title()
      .should(
        "eq",
        "Your Trusted Software Testing Partner in Critical Moments - Testlio"
      );
    // Check the existance of the title
    if (title) {
      // log the title
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

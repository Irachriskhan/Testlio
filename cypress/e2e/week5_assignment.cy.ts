// Automate below test case:

// Launch the application testlio.com in the Chrome browser.
// On the homepage identify the test "Your trusted partner in critical testing moments"
// Print the text on console/terminal
// Click on "About" drop down from the top navigation.
// From the dropdown click on "Learn more"
// From the opened page capture the text "We power fused software testing to enable human possibilities."
// Print the text on console/terminal

describe("Test Testlio Platform", () => {
  it("Visit Testlio then go to learn more from about nav-link", () => {
    // visit Testlio
    cy.visit("https://testlio.com/");

    // Get and print the title to console
    cy.title({ log: true }).should(
      "eq",
      "Your Trusted Software Testing Partner in Critical Moments - Testlio"
    );

    // click on About
    cy.get("ul.nav__list>li").contains("About").click();

    // Visit Learn more link
    cy.get("ul.nav__list>li")
      .find("a[href='https://testlio.com/about-us/']")
      .click();

    // Find and print "Fused testing" heading
    cy.get("h1#we-power-fused-software-testing-to-enable-human-possibilities", {
      log: true,
    }).should("be.visible");
  });
});

/**
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
 */

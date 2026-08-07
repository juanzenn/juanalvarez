const BIO = "main article:has(h2)";

describe("Open the homepage", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });
});

describe("Homepage slices render Prismic content", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the hero headline and its call to action", () => {
    cy.get("main h1").should("be.visible").and("not.have.text", "");

    cy.get('main a[href="/contact"]')
      .first()
      .should("be.visible")
      .and("not.have.text", "");
  });

  it("renders the bio heading and prose", () => {
    cy.get(BIO).find("h2").should("not.have.text", "");
    cy.get(BIO).find("p").should("have.length.at.least", 2);
  });

  it("renders the contact details from the settings document", () => {
    cy.get('main a[href^="mailto:"]').should("have.length.at.least", 1);
    cy.get('main a[href^="tel:"]')
      .should("have.length.at.least", 1)
      .and(($link) => {
        expect($link.attr("href")).to.match(/^tel:\+?\d+$/);
      });
  });

  it("renders the socials from the settings document", () => {
    cy.get('main a[href*="github.com"]').should("have.length.at.least", 1);
  });

  it("renders the latest blog posts the slice fetches for itself", () => {
    cy.get('main a[href^="/blog/"]').should("have.length.at.least", 1);
  });
});

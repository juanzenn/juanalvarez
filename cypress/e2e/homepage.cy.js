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

  it("renders well-formed contact links from the settings document", () => {
    cy.get("main").then(($main) => {
      const tel = $main.find('a[href^="tel:"]');
      const mail = $main.find('a[href^="mailto:"]');

      expect(tel.length + mail.length, "contact links rendered").to.be.at.least(
        1,
      );

      tel.each((_, link) => {
        expect(link.getAttribute("href")).to.match(/^tel:\+?\d+$/);
      });

      mail.each((_, link) => {
        expect(link.getAttribute("href")).to.match(/^mailto:.+@.+$/);
      });
    });
  });

  it("renders the socials from the settings document", () => {
    cy.get('main a[href*="github.com"]').should("have.length.at.least", 1);
  });

  it("renders the latest blog posts the slice fetches for itself", () => {
    cy.get('main a[href^="/blog/"]').should("have.length.at.least", 1);
  });
});

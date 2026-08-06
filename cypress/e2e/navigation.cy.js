const TRIGGER = 'button[aria-controls="mobile-menu"]';
const MENU = "#mobile-menu";
const CLOSE = '#mobile-menu button[aria-label="Close menu"]';
const DESKTOP_NAV = "nav ul:not(#mobile-menu)";

describe("Mobile navigation", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
    cy.visit("/");
  });

  it("opens from the trigger and closes from the close button", () => {
    cy.get(TRIGGER).should("have.attr", "aria-expanded", "false");
    cy.get(MENU).should("not.exist");

    cy.get(TRIGGER).click();
    cy.get(MENU).should("be.visible");
    cy.get(TRIGGER).should("have.attr", "aria-expanded", "true");

    cy.get(CLOSE).click();
    cy.get(MENU).should("not.exist");
    cy.get(TRIGGER).should("have.attr", "aria-expanded", "false");
  });

  it("toggles from the trigger without double-toggling itself", () => {
    cy.get(TRIGGER).click();
    cy.get(MENU).should("be.visible");

    cy.get(TRIGGER).click({ force: true });
    cy.get(MENU).should("not.exist");
    cy.get(TRIGGER).should("have.attr", "aria-expanded", "false");

    cy.get(TRIGGER).click();
    cy.get(MENU).should("be.visible");
    cy.get(TRIGGER).should("have.attr", "aria-expanded", "true");
  });

  it("does not close on the dismissing mousedown that precedes a trigger click", () => {
    cy.get(TRIGGER).click();
    cy.get(MENU).should("be.visible");

    cy.get(TRIGGER).trigger("mousedown", { force: true });

    cy.get(MENU).should("be.visible");
    cy.get(TRIGGER).should("have.attr", "aria-expanded", "true");
  });

  it("moves focus into the menu, closes on Escape and restores focus to the trigger", () => {
    cy.get(TRIGGER).click();
    cy.focused().should("have.attr", "aria-label", "Close menu");

    cy.get("body").type("{esc}");

    cy.get(MENU).should("not.exist");
    cy.focused().should("have.attr", "aria-controls", "mobile-menu");
  });

  it("keeps Tab focus cycling inside the menu", () => {
    cy.get(TRIGGER).click();

    cy.get(`${MENU} a`).last().focus().trigger("keydown", { key: "Tab" });
    cy.focused().should("have.attr", "aria-label", "Close menu");

    cy.focused().trigger("keydown", { key: "Tab", shiftKey: true });
    cy.focused().should("have.attr", "href", "/contact");
  });

  it("closes after navigating from a menu link", () => {
    cy.get(TRIGGER).click();
    cy.get(MENU).contains("a", "Blog").click();

    cy.location("pathname").should("eq", "/blog");
    cy.get(MENU).should("not.exist");
    cy.get(TRIGGER).should("have.attr", "aria-expanded", "false");
  });

  it("closes when the browser navigates back", () => {
    cy.get(TRIGGER).click();
    cy.get(MENU).contains("a", "Blog").click();
    cy.location("pathname").should("eq", "/blog");

    cy.get(TRIGGER).click();
    cy.get(MENU).should("be.visible");

    cy.go("back");

    cy.location("pathname").should("eq", "/");
    cy.get(MENU).should("not.exist");
  });

  it("marks the current page inside the menu", () => {
    cy.visit("/blog");
    cy.get(TRIGGER).click();

    cy.get(`${MENU} a[href="/blog"]`).should(
      "have.attr",
      "aria-current",
      "page"
    );
    cy.get(`${MENU} a[href="/"]`).should("not.have.attr", "aria-current");
  });

  it("locks body scroll while open and restores it on close", () => {
    cy.get("body").should("not.have.css", "overflow", "hidden");

    cy.get(TRIGGER).click();
    cy.get("body").should("have.css", "overflow", "hidden");

    cy.get(CLOSE).click();
    cy.get(MENU).should("not.exist");
    cy.get("body").should("not.have.css", "overflow", "hidden");
  });

  it("restores body scroll when navigating away with the menu open", () => {
    cy.get(TRIGGER).click();
    cy.get("body").should("have.css", "overflow", "hidden");

    cy.get(MENU).contains("a", "Blog").click();

    cy.location("pathname").should("eq", "/blog");
    cy.get("body").should("not.have.css", "overflow", "hidden");
  });

  it("anchors the backdrop to the viewport", () => {
    cy.get(TRIGGER).click();

    cy.get(MENU).parent().should("have.css", "position", "fixed");
  });
});

describe("Scrolled navbar", () => {
  const scrollWindowTo = (offset) => {
    cy.scrollTo(0, offset);
    cy.window().then((win) => win.dispatchEvent(new win.Event("scroll")));
  };

  const openAndCloseMenuToProveHydration = () => {
    cy.get(TRIGGER).click();
    cy.get(MENU).should("be.visible");
    cy.get(CLOSE).click();
    cy.get(MENU).should("not.exist");
  };

  it("gains the scrolled background once past the threshold", () => {
    cy.viewport("iphone-x");
    cy.visit("/");
    openAndCloseMenuToProveHydration();

    scrollWindowTo(0);
    cy.get("nav").should("not.have.class", "shadow");

    scrollWindowTo(400);
    cy.get("nav").should("have.class", "shadow");

    scrollWindowTo(0);
    cy.get("nav").should("not.have.class", "shadow");
  });
});

describe("Desktop navigation", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it("marks only the home item on the homepage", () => {
    cy.visit("/");

    cy.get(DESKTOP_NAV)
      .find('a[href="/"]')
      .should("have.attr", "aria-current", "page");
    cy.get(DESKTOP_NAV)
      .find('a[href="/blog"]')
      .should("not.have.attr", "aria-current");
    cy.get(DESKTOP_NAV)
      .find('a[href="/contact"]')
      .should("not.have.attr", "aria-current");
  });

  it("keeps the blog item marked on a blog post page", () => {
    cy.visit("/blog");
    cy.get('a[href^="/blog/"]').first().click();

    cy.location("pathname").should("match", /^\/blog\/.+/);
    cy.get(DESKTOP_NAV)
      .find('a[href="/blog"]')
      .should("have.attr", "aria-current", "page");
    cy.get(DESKTOP_NAV)
      .find('a[href="/"]')
      .should("not.have.attr", "aria-current");
  });
});

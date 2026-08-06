const SITE_URL = "https://juanalvarez.dev";
const DEFAULT_COVER_URL = `${SITE_URL}/cover.png`;

const fetchDocument = (path) =>
  cy
    .request(path)
    .then(({ body }) => new DOMParser().parseFromString(body, "text/html"));

const meta = (doc, key) =>
  doc
    .querySelector(`meta[property="${key}"], meta[name="${key}"]`)
    ?.getAttribute("content");

const text = (doc, selector) => {
  const element = doc.querySelector(selector);

  expect(element, `${selector} in fetched document`).not.to.be.null;

  return element.textContent.trim();
};

const blogPostSlugs = () =>
  fetchDocument("/blog").then((doc) => {
    const slugs = [...doc.querySelectorAll('a[href^="/blog/"]')].map((anchor) =>
      anchor.getAttribute("href").replace("/blog/", "")
    );

    return [...new Set(slugs)];
  });

describe("Default site metadata", () => {
  const pages = ["/", "/blog", "/contact"];

  pages.forEach((path) => {
    it(`gives ${path} a share card built on the default cover`, () => {
      fetchDocument(path).then((doc) => {
        const pageTitle = text(doc, "title");

        expect(pageTitle).not.to.be.empty;
        expect(meta(doc, "og:title")).to.equal(pageTitle);

        expect(meta(doc, "description")).not.to.be.empty;
        expect(meta(doc, "og:description")).to.equal(meta(doc, "description"));

        expect(meta(doc, "og:site_name")).to.equal("Juan Alvarez");
        expect(meta(doc, "og:type")).to.equal("website");
        expect(meta(doc, "og:image")).to.equal(DEFAULT_COVER_URL);
        expect(meta(doc, "twitter:card")).to.equal("summary_large_image");
      });
    });
  });

  it("gives each page its own title", () => {
    const titles = [];

    pages.forEach((path) => {
      fetchDocument(path).then((doc) => {
        titles.push(text(doc, "title"));
      });
    });

    cy.then(() => {
      expect(new Set(titles).size, "distinct titles").to.equal(pages.length);
    });
  });
});

describe("Blog post metadata", () => {
  it("advertises the post's own title, description and cover image", () => {
    blogPostSlugs().then(([slug]) => {
      fetchDocument(`/blog/${slug}`).then((doc) => {
        const heading = text(doc, "h1");

        expect(heading).not.to.be.empty;
        expect(text(doc, "title")).to.equal(heading);
        expect(meta(doc, "og:title")).to.equal(heading);

        expect(meta(doc, "description")).not.to.be.empty;
        expect(meta(doc, "og:description")).to.equal(meta(doc, "description"));

        expect(meta(doc, "og:type")).to.equal("article");
        expect(meta(doc, "og:url")).to.equal(`${SITE_URL}/blog/${slug}`);

        if (doc.querySelector("header figure img")) {
          expect(meta(doc, "og:image")).to.match(
            /^https:\/\/images\.prismic\.io\//
          );
        } else {
          expect(meta(doc, "og:image")).to.equal(DEFAULT_COVER_URL);
        }

        expect(Number(meta(doc, "og:image:width"))).to.be.greaterThan(0);
        expect(Number(meta(doc, "og:image:height"))).to.be.greaterThan(0);

        expect(meta(doc, "twitter:card")).to.equal("summary_large_image");
      });
    });
  });

  it("returns a 404 for a slug that matches no post", () => {
    cy.request({
      url: "/blog/no-post-has-ever-had-this-slug",
      failOnStatusCode: false,
    })
      .its("status")
      .should("equal", 404);
  });

  it("gives two different posts different titles and covers", () => {
    blogPostSlugs().then((slugs) => {
      expect(slugs.length, "posts available to compare").to.be.at.least(2);

      const [first, second] = slugs;

      fetchDocument(`/blog/${first}`).then((firstDoc) => {
        fetchDocument(`/blog/${second}`).then((secondDoc) => {
          expect(text(firstDoc, "title")).not.to.equal(
            text(secondDoc, "title")
          );
          expect(meta(firstDoc, "og:title")).not.to.equal(
            meta(secondDoc, "og:title")
          );
          expect(meta(firstDoc, "og:url")).not.to.equal(
            meta(secondDoc, "og:url")
          );
          expect(meta(firstDoc, "og:image")).not.to.equal(
            meta(secondDoc, "og:image")
          );
        });
      });
    });
  });
});

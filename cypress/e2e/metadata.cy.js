const SITE_URL = "https://juanalvarez.dev";

const fetchDocument = (path, options = {}) =>
  cy
    .request({ url: path, ...options })
    .then(({ body }) => new DOMParser().parseFromString(body, "text/html"));

const meta = (doc, key) =>
  doc
    .querySelector(`meta[property="${key}"], meta[name="${key}"]`)
    ?.getAttribute("content");

const blogPostSlugs = () =>
  cy.request("/blog").then(({ body }) => {
    const slugs = [...body.matchAll(/href="\/blog\/([^"?#]+)"/g)].map(
      (match) => match[1]
    );

    return [...new Set(slugs)];
  });

describe("Default site metadata", () => {
  const pages = ["/", "/blog", "/contact"];

  pages.forEach((path) => {
    it(`gives ${path} a share card built on the default cover`, () => {
      fetchDocument(path).then((doc) => {
        const pageTitle = doc.querySelector("title").textContent;

        expect(pageTitle).not.to.be.empty;
        expect(meta(doc, "og:title")).to.equal(pageTitle);
        expect(meta(doc, "og:description")).to.equal(meta(doc, "description"));
        expect(meta(doc, "og:site_name")).to.equal("Juan Alvarez");
        expect(meta(doc, "og:type")).to.equal("website");
        expect(meta(doc, "og:image")).to.equal(`${SITE_URL}/cover.png`);
        expect(meta(doc, "twitter:card")).to.equal("summary_large_image");
      });
    });
  });

  it("gives each page its own title", () => {
    const titles = [];

    pages.forEach((path) => {
      fetchDocument(path).then((doc) => {
        titles.push(doc.querySelector("title").textContent);
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
        const heading = doc.querySelector("h1").textContent.trim();

        expect(heading).not.to.be.empty;
        expect(doc.querySelector("title").textContent).to.equal(heading);
        expect(meta(doc, "og:title")).to.equal(heading);

        expect(meta(doc, "description")).not.to.be.empty;
        expect(meta(doc, "og:description")).to.equal(meta(doc, "description"));

        expect(meta(doc, "og:type")).to.equal("article");
        expect(meta(doc, "og:url")).to.equal(`${SITE_URL}/blog/${slug}`);

        expect(meta(doc, "og:image")).to.match(
          /^https:\/\/images\.prismic\.io\//
        );
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
          expect(firstDoc.querySelector("title").textContent).not.to.equal(
            secondDoc.querySelector("title").textContent
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

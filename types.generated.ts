// Code generated by prismic-ts-codegen. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = {
  [KeyType in keyof T]: T[KeyType];
};
/** Content for Blog post documents */
interface BlogPostDocumentData {
  /**
   * Title field in *Blog post*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismic.TitleField;
  /**
   * Slug field in *Blog post*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.slug
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  slug: prismic.KeyTextField;
  /**
   * Description field in *Blog post*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  description: prismic.RichTextField;
  /**
   * Cover field in *Blog post*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.cover
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  cover: prismic.ImageField<never>;
  /**
   * Content field in *Blog post*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.content
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  content: prismic.RichTextField;
}
/**
 * Blog post document from Prismic
 *
 * - **API ID**: `blog_post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogPostDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<BlogPostDocumentData>,
    "blog_post",
    Lang
  >;
/** Content for Homepage documents */
interface IndexDocumentData {
  /**
   * Slice zone field in *Homepage*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: index.body[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/slices
   *
   */
  body: prismic.SliceZone<IndexDocumentDataBodySlice>;
}
/**
 * Primary content in Homepage → Slice zone → `heroabout` → Primary
 *
 */
interface IndexDocumentDataBodyHeroaboutSlicePrimary {
  /**
   * Title field in *Homepage → Slice zone → `heroabout` → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: Hi, I'm ...
   * - **API ID Path**: index.body[].heroabout.primary.title
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismic.TitleField;
  /**
   * About field in *Homepage → Slice zone → `heroabout` → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Hey, I like mac & cheese
   * - **API ID Path**: index.body[].heroabout.primary.about
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  about: prismic.RichTextField;
}
export type IndexDocumentDataBodyHeroaboutSlice = prismic.Slice<
  "heroabout",
  Simplify<IndexDocumentDataBodyHeroaboutSlicePrimary>,
  never
>;
/**
 * Primary content in Homepage → Slice zone → `projects` → Primary
 *
 */
interface IndexDocumentDataBodyProjectsSlicePrimary {
  /**
   * Title field in *Homepage → Slice zone → `projects` → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: Ultimate Project
   * - **API ID Path**: index.body[].projects.primary.title
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismic.TitleField;
  /**
   * Subtitle field in *Homepage → Slice zone → `projects` → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: You want to add something?
   * - **API ID Path**: index.body[].projects.primary.subtitle
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  subtitle: prismic.RichTextField;
}
/**
 * Item in Homepage → Slice zone → `projects` → Items
 *
 */
export interface IndexDocumentDataBodyProjectsSliceItem {
  /**
   * Project title field in *Homepage → Slice zone → `projects` → Items*
   *
   * - **Field Type**: Title
   * - **Placeholder**: Turtle Finder
   * - **API ID Path**: index.body[].projects.items[].project_title
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  project_title: prismic.TitleField;
  /**
   * Project Type field in *Homepage → Slice zone → `projects` → Items*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Web Application
   * - **API ID Path**: index.body[].projects.items[].project_type
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  project_type: prismic.KeyTextField;
  /**
   * Github Link field in *Homepage → Slice zone → `projects` → Items*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: index.body[].projects.items[].github_link
   * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
   *
   */
  github_link: prismic.LinkField;
  /**
   * Link field in *Homepage → Slice zone → `projects` → Items*
   *
   * - **Field Type**: Link
   * - **Placeholder**: http://turtlefinder.io
   * - **API ID Path**: index.body[].projects.items[].link
   * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
   *
   */
  link: prismic.LinkField;
  /**
   * Project Description field in *Homepage → Slice zone → `projects` → Items*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: I made this app for finding turtles near me
   * - **API ID Path**: index.body[].projects.items[].project_description
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  project_description: prismic.RichTextField;
}
export type IndexDocumentDataBodyProjectsSlice = prismic.Slice<
  "projects",
  Simplify<IndexDocumentDataBodyProjectsSlicePrimary>,
  Simplify<IndexDocumentDataBodyProjectsSliceItem>
>;
/**
 * Primary content in Homepage → Slice zone → `blog_posts` → Primary
 *
 */
interface IndexDocumentDataBodyBlogPostsSlicePrimary {
  /**
   * Title field in *Homepage → Slice zone → `blog_posts` → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: Blog Posts about Cats
   * - **API ID Path**: index.body[].blog_posts.primary.title
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismic.TitleField;
  /**
   * Subtitle field in *Homepage → Slice zone → `blog_posts` → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Want to add something?
   * - **API ID Path**: index.body[].blog_posts.primary.subtitle
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  subtitle: prismic.RichTextField;
}
/**
 * Item in Homepage → Slice zone → `blog_posts` → Items
 *
 */
export interface IndexDocumentDataBodyBlogPostsSliceItem {
  /**
   * Blog field in *Homepage → Slice zone → `blog_posts` → Items*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: index.body[].blog_posts.items[].blog
   * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
   *
   */
  blog: prismic.ContentRelationshipField<"blog_post">;
}
export type IndexDocumentDataBodyBlogPostsSlice = prismic.Slice<
  "blog_posts",
  Simplify<IndexDocumentDataBodyBlogPostsSlicePrimary>,
  Simplify<IndexDocumentDataBodyBlogPostsSliceItem>
>;
/**
 * Item in Homepage → Slice zone → `contact` → Items
 *
 */
export interface IndexDocumentDataBodyContactSliceItem {
  /**
   * Contact Label field in *Homepage → Slice zone → `contact` → Items*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Twitter/GitHub/Email...
   * - **API ID Path**: index.body[].contact.items[].contact_label
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  contact_label: prismic.KeyTextField;
  /**
   * Contact Link field in *Homepage → Slice zone → `contact` → Items*
   *
   * - **Field Type**: Link
   * - **Placeholder**: https://github.com/xxx | mailto:myemail@email.com
   * - **API ID Path**: index.body[].contact.items[].contact_link
   * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
   *
   */
  contact_link: prismic.LinkField;
}
export type IndexDocumentDataBodyContactSlice = prismic.Slice<
  "contact",
  Record<string, never>,
  Simplify<IndexDocumentDataBodyContactSliceItem>
>;
/**
 * Slice for *Homepage → Slice zone*
 *
 */
type IndexDocumentDataBodySlice =
  | IndexDocumentDataBodyHeroaboutSlice
  | IndexDocumentDataBodyProjectsSlice
  | IndexDocumentDataBodyBlogPostsSlice
  | IndexDocumentDataBodyContactSlice;
/**
 * Homepage document from Prismic
 *
 * - **API ID**: `index`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type IndexDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<IndexDocumentData>, "index", Lang>;
export type AllDocumentTypes = BlogPostDocument | IndexDocument;
/**
 * Primary content in IndexHero → Primary
 *
 */
interface IndexHeroSliceDefaultSlicePrimary {
  /**
   * Title field in *IndexHero → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: Your Nice title...
   * - **API ID Path**: index_hero.primary.Title
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  Title: prismic.TitleField;
  /**
   * About field in *IndexHero → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: I like turtles...
   * - **API ID Path**: index_hero.primary.About
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  About: prismic.RichTextField;
}
/**
 * Default slice variation for IndexHero Slice
 *
 * - **API ID**: `default-slice`
 * - **Description**: `IndexHero`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type IndexHeroSliceDefaultSlice = prismic.SharedSliceVariation<
  "default-slice",
  Simplify<IndexHeroSliceDefaultSlicePrimary>,
  never
>;
/**
 * Slice variation for *IndexHero*
 *
 */
type IndexHeroSliceVariation = IndexHeroSliceDefaultSlice;
/**
 * IndexHero Shared Slice
 *
 * - **API ID**: `index_hero`
 * - **Description**: `IndexHero`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type IndexHeroSlice = prismic.SharedSlice<
  "index_hero",
  IndexHeroSliceVariation
>;
declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig
    ): prismic.Client<AllDocumentTypes>;
  }
  namespace Content {
    export type {
      BlogPostDocumentData,
      BlogPostDocument,
      IndexDocumentData,
      IndexDocumentDataBodyHeroaboutSlicePrimary,
      IndexDocumentDataBodyHeroaboutSlice,
      IndexDocumentDataBodyProjectsSlicePrimary,
      IndexDocumentDataBodyProjectsSliceItem,
      IndexDocumentDataBodyProjectsSlice,
      IndexDocumentDataBodyBlogPostsSlicePrimary,
      IndexDocumentDataBodyBlogPostsSliceItem,
      IndexDocumentDataBodyBlogPostsSlice,
      IndexDocumentDataBodyContactSliceItem,
      IndexDocumentDataBodyContactSlice,
      IndexDocumentDataBodySlice,
      IndexDocument,
      AllDocumentTypes,
      IndexHeroSliceDefaultSlicePrimary,
      IndexHeroSliceDefaultSlice,
      IndexHeroSliceVariation,
      IndexHeroSlice,
    };
  }
}

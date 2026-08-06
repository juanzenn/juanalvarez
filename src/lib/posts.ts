import * as prismic from "@prismicio/client";
import type { BlogPostDocument } from "@/types.generated";
import { prismicClient } from "~/lib/prismic";

export const getPostBySlug = async (
  slug: string
): Promise<BlogPostDocument | null> => {
  if (!slug) return null;

  try {
    return await prismicClient().getSingle("blog_post", {
      predicates: [prismic.filter.at("my.blog_post.slug", slug)],
    });
  } catch (error) {
    if (error instanceof prismic.NotFoundError) return null;

    throw error;
  }
};

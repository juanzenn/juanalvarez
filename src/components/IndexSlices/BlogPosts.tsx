import { BlogPostDocument } from "~/types.generated";
import PostPreview from "../PostPreview";
import { H2 } from "../utils/text";

export default function BlogPosts({ posts }: { posts: BlogPostDocument[] }) {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12">
      <H2 className="mb-6">Latest Blogs</H2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostPreview key={post.id} post={post.data} />
        ))}
      </div>
    </section>
  );
}

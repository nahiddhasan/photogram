import { getPosts } from "@/utils/data";
import LoadMorePosts from "./LoadMorePosts";
const POST_PER_PAGE = 5;
const AllPosts = async () => {
  const { posts, totalPosts } = await getPosts(0, POST_PER_PAGE);
  return (
    <div>
      <LoadMorePosts initialPosts={posts} totalPosts={totalPosts} />
    </div>
  );
};

export default AllPosts;

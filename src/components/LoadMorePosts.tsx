"use client";

import { PostsWithAll } from "@/types/post";
import { getPosts } from "@/utils/data";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import SinglePost from "./SinglePost";
const POST_PER_PAGE = 5;
type Props = {
  initialPosts: PostsWithAll[];
  totalPosts: number;
};
const LoadMorePosts = ({ initialPosts, totalPosts }: Props) => {
  const [posts, setPosts] = useState<PostsWithAll[]>(initialPosts);
  const [skip, setSkip] = useState(POST_PER_PAGE);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();
  const loadMore = async () => {
    if (!isLoading) {
      setIsLoading(true);

      try {
        const { posts: apiData } = await getPosts(skip, POST_PER_PAGE);

        setPosts((prevPosts) => [...prevPosts, ...apiData]);
        setSkip((prevSkip) => prevSkip + POST_PER_PAGE);
      } catch (error) {
        console.log(error);
        toast.error("Failed to Load More...");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (posts.length < totalPosts) {
      loadMore();
    }
  }, [inView]);

  return (
    <div>
      {posts.map((post) => (
        <SinglePost key={post.id} post={post} session={session} />
      ))}

      {isLoading ? (
        <span>Loading...</span>
      ) : (
        posts.length < totalPosts && (
          <div ref={ref} className="flex items-center justify-center py-12">
            <span>Loading...</span>
          </div>
        )
      )}
    </div>
  );
};

export default LoadMorePosts;

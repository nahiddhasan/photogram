"use client";
import useOutsideClick from "@/hooks/outsideClick";
import { PostsWithCommentUser } from "@/types/post";
import { formatTimeToNow } from "@/utils/formatTime";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import AddComment from "./AddComment";
import CommentMoreOption from "./CommentMoreOption";
import MoreOption from "./MoreOption";
import PostActions from "./PostActions";
import UserAvatar from "./UserAvatar";

const SinglePostModal = ({ post }: { post: PostsWithCommentUser | null }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const ModalRef = useOutsideClick(() => {
    router.back();
  });

  if (!post) {
    return;
  }
  return (
    <div className="flex items-center justify-center h-full w-full fixed top-0 left-0 dark:bg-zinc-900/10 backdrop-blur-sm">
      <span className="absolute right-4 top-4 cursor-pointer text-xl">
        <IoMdClose />
      </span>
      <div
        ref={ModalRef}
        className="flex flex-col md:flex-row h-max md:h-[75%] mx-4 md:mx-10 w-[90%] md:w-[85%] dark:bg-zinc-900 shadow-2xl"
      >
        <div className="relative md:flex-[2] h-[300px] md:h-full w-full">
          <Image
            src={post.image}
            fill
            alt=""
            className="object-contain w-full"
          />
        </div>
        <div className="flex-1 flex justify-between flex-col h-full">
          <div className=" flex items-center justify-between p-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <UserAvatar
                image={post.user.image}
                username={post.user.username!}
              />
              <button className="text-blue-500">follow</button>
            </div>
            <MoreOption post={post} userId={session?.user?.id} />
          </div>
          {/* post caption  */}
          <div className="flex-[4] overflow-y-auto">
            {post?.caption && (
              <div className="px-4 py-2">
                {/* post user  */}
                <div className="flex items-center gap-2">
                  <UserAvatar
                    image={post.user.image}
                    username={post.user.username!}
                    name={formatTimeToNow(post.createdAt)}
                  />
                </div>
                {/* cpation  */}
                <p className="ml-10 dark:text-gray-300 text-gray-800">
                  {post?.caption}
                </p>
              </div>
            )}

            {/* comments here  */}
            {post?.comments?.length ? (
              post?.comments?.map((comment: any) => (
                <div key={comment.id} className="px-4 py-1 group">
                  {/* comment user  */}
                  <div className="flex items-center justify-between ">
                    <UserAvatar
                      image={comment.user.image}
                      username={comment.user.username!}
                      name={formatTimeToNow(comment.createdAt)}
                    />
                    <div className="md:hidden md:group-hover:block">
                      <CommentMoreOption
                        comment={comment}
                        userId={session?.user?.id}
                      />
                    </div>
                  </div>
                  {/* comment  */}
                  <div className="flex items-center justify-between w-full">
                    <p className="ml-10">{comment?.body}</p>
                    {/* <span className="p-2">like</span> */}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center text-2xl">
                No comments yet.
              </div>
            )}
          </div>

          <div className="px-4 py-2 flex-[2] border-t border-zinc-800">
            <PostActions post={post} userId={session?.user?.id} />
            <div className="flex items-center gap-2">
              <Image
                src={session?.user?.image || "/img/avatar.png"}
                width={30}
                height={30}
                alt="userImg"
                className="object-cover rounded-full"
              />

              <AddComment postId={post.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostModal;

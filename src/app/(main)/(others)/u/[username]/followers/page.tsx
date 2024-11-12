import { auth } from "@/utils/auth";
import { getFollowings } from "@/utils/data";
import FollowerModel from "../_components/FollowerModel";

const FollowerPage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const session = await auth();
  const { followers } = await getFollowings(username);

  const isFollowing = followers.some(
    (follow) => follow.followerId === session?.user?.id
  );

  return (
    <div>
      <FollowerModel
        followers={followers}
        username={username}
        isFollowing={isFollowing}
      />
    </div>
  );
};

export default FollowerPage;

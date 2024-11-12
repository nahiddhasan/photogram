"use server";
import { unstable_noStore } from "next/cache";
import { auth } from "./auth";
import { prisma } from "./connect";

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("You are not logged in!");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("User get by userId failed!!");
  }
};

export const getAllUsers = async () => {
  const session = await auth();
  try {
    if (!session) {
      throw new Error("You are not logged in!");
    }
    const usersCount = await prisma.user.count();
    const skip = Math.floor(Math.random() * usersCount);

    const users = await prisma.user.findMany({
      take: 3,
      skip,
      where: {
        NOT: {
          followers: {
            every: {
              followerId: session?.user?.id,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        emailVerified: true,
        followers: true,
      },
    });
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("User get by userId failed!");
  }
};

export const getUserByUsername = async (username: string) => {
  const session = await auth();
  try {
    if (!session || !session.user) {
      throw new Error("You are not logged in!");
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        followers: true,
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });
    if (!user) {
      throw new Error("User not found!");
    }
    const { password, ...others } = user;
    return others;
  } catch (error) {
    throw new Error("User get by username failed!");
  }
};

export const getPosts = async (skip: number, take: number) => {
  unstable_noStore();
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            image: true,
            username: true,
          },
        },
        likes: true,
        comments: true,
        savedPosts: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take,
    });
    const totalPosts = await prisma.post.count();
    return { posts, totalPosts };
  } catch (error) {
    throw new Error("Fetch all posts error!");
  }
};

export const getPostsByUsername = async (username: string) => {
  const session = await auth();
  try {
    if (!session) {
      throw new Error("You are not logged in!");
    }
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error("User not found with this username!");
    }

    const posts = await prisma.post.findMany({
      where: {
        userId: user.id,
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Fetch userposts error!");
  }
};

export const getSavedPostsByUsername = async (username: string) => {
  const session = await auth();
  try {
    if (!session) {
      throw new Error("You are not logged in!");
    }
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error("User not found with this username!");
    }

    const savedPosts = await prisma.savedPost.findMany({
      where: {
        userId: user.id,
      },
      include: {
        post: {
          include: {
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return savedPosts;
  } catch (error) {
    console.log(error);
    throw new Error("Fetch savedPosts error!");
  }
};

export const getSinglePost = async (id: string) => {
  unstable_noStore();
  try {
    const singlePost = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            image: true,
            username: true,
          },
        },
        likes: true,
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                emailVerified: true,
                image: true,
                username: true,
              },
            },
          },
        },
        savedPosts: true,
      },
    });

    return singlePost;
  } catch (error) {
    console.log(error);
    throw new Error("Fetch single post error!");
  }
};

export const getFollowings = async (username: string) => {
  unstable_noStore();
  const session = await auth();

  try {
    if (!session) {
      throw new Error("You are not logged in!");
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error("User not found with this username!");
    }

    const followrsCount = await prisma.follows.count({
      where: {
        followingId: user.id,
      },
    });

    const followers = await prisma.follows.findMany({
      where: {
        followingId: user.id,
      },
      include: {
        follower: true,
      },
    });

    const followingsCounts = await prisma.follows.count({
      where: {
        followerId: user.id,
      },
    });
    const following = await prisma.follows.findMany({
      where: {
        followerId: user.id,
      },
      include: {
        following: true,
      },
    });

    return {
      followers,
      followrsCount,
      following,
      followingsCounts,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Fetch followings error!");
  }
};

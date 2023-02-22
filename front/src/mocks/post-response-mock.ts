import { PostResponse } from "../responses/PostResponse";
import { postsMock } from "./posts-mock";
import { postsReactionsMock } from "./posts-reactions-mock";
import { usersMock } from "./users-mock";

export const PostResponseMock: PostResponse[] = [
  {
    id: 1,
    ...getPostById(1),
    user: {
      ...getUserByPostId(1)
    },
    reactions: getPostsReactionsById(1),
    commentsCount: getPostsReactionsById(1).length,
  },
  {
    id: 2,
    ...getPostById(2),
    user: {
      ...getUserByPostId(2)
    },
    reactions: getPostsReactionsById(2),
    commentsCount: getPostsReactionsById(2).length,
  },



];


export function getPostsReactionsById(id: number): { reaction_id: number ,user_id: number }[] {
  const reactions = postsReactionsMock.filter(p => p.post_id === id);
  const response: { reaction_id: number, user_id: number }[] = reactions.map(p => { return { reaction_id: p.reaction_id, user_id: p.user_id } })
  return response;
}

export function getPostById(id: number): { content: string, created_at: Date } {
  const post = postsMock.find(p => p.id === id)!;
  return {
    content: post.content,
    created_at: post.created_at
  }
}

export function getUserByPostId(id: number): { id: number, firstname: string, lastname: string } {
  const user = usersMock.find(u => u.id === id)!;
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname
  }
}
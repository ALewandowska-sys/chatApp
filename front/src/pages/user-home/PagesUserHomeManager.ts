import { postCommentsMock } from "../../mocks/post-comments-mock";
import { usersMock } from "../../mocks/users-mock";
import { PostComment } from "../../models/PostComment";
import { PostCommentResponse, PostCommentUserResponse } from "../../responses/PostResponse";

export function getPostComments(id: number): PostCommentResponse[] {
  const comments = postCommentsMock.filter(c => c.post_id === id);

  const resp: PostCommentResponse[] = []
  comments.forEach((comment: PostComment) => {
    const ob: PostCommentResponse = {
      id: comment.id,
      content: comment.content,
      created_at: comment.created_at,
      user: {
        ...getUuserDataForPostComment(comment.user_id)
      }
    }

    resp.push(ob);
  });

  return resp;
}


export function getUuserDataForPostComment(userId: number): PostCommentUserResponse {
  const user = usersMock.find(u => u.id === userId)!;
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname
  }
}
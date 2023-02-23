import { PostComment } from "../models/PostComment";

export const postCommentsMock: PostComment[] = [
  { id: 1, content: 'Do dupy', created_at: new Date(), post_id: 1, user_id: 1 },
  { id: 1, content: 'supcio', created_at: new Date(), post_id: 1, user_id: 2 },
  { id: 1, content: 'Hehe', created_at: new Date(), post_id: 2, user_id: 3 },
];
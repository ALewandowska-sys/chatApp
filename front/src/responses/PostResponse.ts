export interface PostResponse {
  id: number;
  user: {
    id: number;
    firstname: string;
    lastname: string;
  }
  content: string;
  created_at: Date;
  reactions: {
    reaction_id: number;
    user_id: number;
  }[];
  commentsCount: number;
  comments?: PostCommentResponse[],
  comment: string;
}

export interface PostCommentResponse {
  id: number;
  content: string;
  user: PostCommentUserResponse;
  created_at: Date;
}

export interface PostCommentUserResponse {
  id: number;
  firstname: string;
  lastname: string;
}

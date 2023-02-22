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
  comments?: {
    id: number;
    content: string;
    user_id: number;
    created_at: Date;
  }[]
}

//export interface
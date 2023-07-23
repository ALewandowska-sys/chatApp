export interface Post {
  userId: string;
  content: string;
  createdAt: Date;
  comments: [];
  reactions: [];
}

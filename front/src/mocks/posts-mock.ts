import { Post } from "../models/Post";

export const postsMock: Post[] = [
  { id: 1, content: 'Hello everyone.', created_at: new Date(), user_id: 1, },
  { id: 2, content: 'Some post example written by someone 2.', created_at: new Date(), user_id: 2, },
  { id: 3, content: 'Some post example written by someone 3.', created_at: new Date(), user_id: 3, },
  { id: 4, content: 'Some post example written by someone 4.', created_at: new Date(), user_id: 4, },
]
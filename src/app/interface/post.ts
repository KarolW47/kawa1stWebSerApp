import { User } from './user';

export interface Post {
  id: string;
  user: User;
  createDate: Date;
  postTextMessage: string;
  updateDate: Date;
}

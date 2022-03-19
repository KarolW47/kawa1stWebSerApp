import { User } from "./user";

export interface Post {
    id: number,
    user: User,
    createDate: Date,
    postTextMessage: string,
    updateDate: Date,
}

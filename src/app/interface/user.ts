import { Post } from "./post";

export interface User {
    id: number;
    username: string;
    emailAddress: string;
    password: string;
    aboutMeInfo: string;
    userPosts: Post[];
    userRoles: String[];
}

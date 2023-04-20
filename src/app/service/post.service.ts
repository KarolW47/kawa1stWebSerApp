import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../interface/post';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
  ) {}

  getPosts() {
    return this.http.get<Post[]>(`${environment.apiUrl}/post/posts`, {
      headers: this.tokenStorageService.getTokensAsHeaders(),
    });
  }

  getUserPosts(userId: number) {
    return this.http.get<Post[]>(`${environment.apiUrl}/post/ofUser`, {
      params: new HttpParams().set('user_id', userId),
      headers: this.tokenStorageService.getTokensAsHeaders(),
    });
  }

  addPost(post: Post) {
    return this.http.post<Post>(`${environment.apiUrl}/post/add`, post, {
      observe: 'response',
      headers: this.tokenStorageService.getTokensAsHeaders(),
    });
  }

  deletePost(post: Post) {
    return this.http.delete<any>(`${environment.apiUrl}/post/delete`, {
      body: post,
      headers: this.tokenStorageService.getTokensAsHeaders(),
    });
  }

  editPost(post: Post) {
    return this.http.patch<Post>(`${environment.apiUrl}/post/edit`, post, {
      observe: 'response',
      headers: this.tokenStorageService.getTokensAsHeaders(),
    });
  }
}

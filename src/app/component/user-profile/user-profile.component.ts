import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interface/post';
import { User } from 'src/app/interface/user';
import { PostService } from 'src/app/service/post.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user!: User;
  username!: string;
  postsOfUser!: Post[];
  currentUserId: number = +this.tokenStorageService.getUserId();

  constructor(private userService: UserService, private postService: PostService, private activatedRoute: ActivatedRoute, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.username = params['username'];
    });

    this.userService.getUser(this.username).subscribe({
      next: (resp) => {
        this.user = resp;
      },
      error: (error) => {
        console.log(error.status);
        console.log(error.error);
      }
    });

    this.postService.getUserPosts(this.username).subscribe({
      next: (resp) => {
        this.postsOfUser = resp.reverse();
      },
      error: (error) => {
        console.log(error.status);
        console.log(error.error);
      }
    });
  }
}

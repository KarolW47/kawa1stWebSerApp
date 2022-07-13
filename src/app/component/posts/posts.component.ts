import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Post } from 'src/app/interface/post';
import { PostService } from 'src/app/service/post.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postsList: Post[] = [];
  wasClicked: boolean = false;
  currentUserId: number = +this.tokenStorageService.getUserId();

  constructor(private postService: PostService, private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(res => {
      this.postsList = res.reverse();
    })  
  }

}

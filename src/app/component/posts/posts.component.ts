import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/interface/post';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postsList$: Post[] = [];
  wasClicked: boolean = false;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(res => {
      this.postsList$ = res.reverse();
    })
  }

  onClick(): void {
    this.wasClicked = true;
  }
}
